import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from '../interfaces/login-dto.interface';
import { AccessToken } from '../interfaces/access-token.interface';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../enums/role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<any> {
    endPoint = 'auth';
    public isAuth = new BehaviorSubject<boolean>(false);
    private URL: string = `${this.baseUrl}/${this.endPoint}`;

    constructor(http: HttpClient, private router: Router) {
        super(http);
        this.autoSignIn();
        this.checkTokenExpiration();
    }

    // On initialise l'état connecté si jeton existant
    autoSignIn() {
        if (localStorage.getItem('mn-token')) {
            this.isAuth.next(true);
        }
    }

    login(dto: LoginDto): Observable<AccessToken | any> {
        let loginUrl: string = `${this.URL}/login`;
        return this.http.post<AccessToken | any>(loginUrl, dto).pipe(
            tap((res: AccessToken | any) => {
                if (res.access_token) {
                    localStorage.setItem('mn-token', res.access_token);
                    this.isAuth.next(true);
                }
                return res;
            })
        );
    }

    // Obtenir le jeton JWT du localStorage
    getToken(): string | null {
        return localStorage.getItem('mn-token');
    }

    // Décodage du JWT pour obtenir ses informations
    decodeToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (e) {
            return null;
        }
    }

    // Vérifier si le jeton a expiré
    isTokenExpired(token: string): boolean {
        const decoded = this.decodeToken(token);
        if (decoded) {
            const exp = decoded.exp;
            if (exp) {
                return Date.now() >= exp * 1000;
            }
        }
        return true;
    }

    // Suppression du jeton et redirection de l'utilisateur
    logout() {
        localStorage.removeItem('mn-token');
        this.isAuth.next(false);
        this.router.navigateByUrl('home');
    }

    // Vérifier périodiquement l'expiration du jeton
    checkTokenExpiration() {
        const token = this.getToken();

        if (token && this.isTokenExpired(token)) {
            this.logout();
        }
        setInterval(() => {
            const token = this.getToken();
            if (token && this.isTokenExpired(token)) {
                this.logout();
            }
        }, 60000); // Vérification toutes les 60 secondes
    }

    // Obtenir le rôle de l'utilisateur sur base du jeton
    getUserRole(): string | null {
        const token = this.getToken();
        if (token) {
            const decoded = this.decodeToken(token);
            return decoded?.role || null;
        }
        return null;
    }

    // Obtenir l'id de l'utilisateur sur base du jeton
    getUserId(): string | null {
        const token = this.getToken();
        if (token) {
            const decoded = this.decodeToken(token);
            return decoded?.id || null;
        }
        return null;
    }

    redirect() {
        const role = this.getUserRole();

        switch (role) {
            case Role.Admin:
                this.router.navigate(['/admin']);
                break;
            case Role.Owner:
                this.router.navigate(['/owner']);
                break;
            case Role.User:
                this.router.navigate(['/user']);
                break;
        }
    }
}

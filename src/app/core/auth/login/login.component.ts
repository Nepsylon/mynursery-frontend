import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../interfaces/login-dto.interface';
import { AccessToken } from '../interfaces/access-token.interface';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'mn-login',
    standalone: true,
    imports: [ReactiveFormsModule, RecaptchaV3Module, ButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
    public errorMessage: string = '';
    private recaptchaSubscription: Subscription | undefined;
    private authSubscription: Subscription | undefined;

    constructor(private authService: AuthService, private recaptchaV3Service: ReCaptchaV3Service, private router: Router) {}

    ngOnInit(): void {
        if (this.authService.isAuth) {
            this.authService.redirect();
        }
    }
    ngOnDestroy(): void {
        if (this.recaptchaSubscription) {
            this.recaptchaSubscription.unsubscribe();
        }
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }

        // Supprimer le script reCAPTCHA pour éviter qu'il persiste
        const recaptchaScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
        if (recaptchaScript) {
            recaptchaScript.remove();
        }

        // Supprimer le badge reCAPTCHA
        const recaptchaBadge = document.querySelector('.grecaptcha-badge');
        if (recaptchaBadge) {
            recaptchaBadge.remove();
        }
    }

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        //recaptcha: new FormControl(null, Validators.required),
    });

    loading: boolean = false;

    public get email() {
        return this.loginForm.get('email');
    }

    public login(): void {
        this.loading = true;
        this.recaptchaSubscription = this.recaptchaV3Service.execute('login').subscribe({
            next: (token: string) => {
                //console.log('reCAPTCHA', token);
                this.submitLoginForm();
            },
            error: (error) => {
                this.loading = false;
                console.log('reCAPTCHA error:', error);
                this.errorMessage = 'Erreur reCAPTCHA, veuillez réessayer.';
            },
        });
    }
    redirectToHome() {
        this.router.navigate(['/home']);
    }

    submitLoginForm() {
        let credentials: LoginDto = {
            email: this.loginForm.value.email as string,
            password: this.loginForm.value.password as string,
        };
        this.authSubscription = this.authService.login(credentials).subscribe({
            next: (res: AccessToken | any) => {
                // Redirection si jeton d'accès
                if (res.access_token) {
                    //this.authService.redirect();
                    this.router.navigateByUrl('');
                } else {
                    this.loading = false;
                    this.errorMessage = res.message;
                }
            },
            error: (res: any) => {
                // Afficher erreur
                this.loading = false;
                this.errorMessage = 'Une erreur inattendue est survenue';
            },
        });
    }
}

import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();

        // Clone the request and add the authorization header
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        // Pass the cloned request with the updated header to the next handler
        return next.handle(authReq).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // Handle HTTP errors
                    if (err.status === 401) {
                        // Specific handling for unauthorized errors
                        console.error('Unauthorized request:', err);
                        this.authService.logout();
                        this.router.navigateByUrl('/login');
                        // You might trigger a re-authentication flow or redirect the user here
                    } else {
                        // Handle other HTTP error codes
                        console.error('HTTP error:', err);
                    }
                } else {
                    // Handle non-HTTP errors
                    console.error('An error occurred:', err);
                }

                // Re-throw the error to propagate it further
                return throwError(() => err);
            })
        );
    }
}

export const AuthInterceptorProviders = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };

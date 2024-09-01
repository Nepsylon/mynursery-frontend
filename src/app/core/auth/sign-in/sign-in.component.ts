import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../services/auth.service';
import { SignInService } from '../services/sign-in.service';
import { createUserDto } from '../interfaces/create-user.dto';
import { User } from '../../../shared/interfaces/user.interface';
import { LoginDto } from '../interfaces/login-dto.interface';
import { AccessToken } from '../interfaces/access-token.interface';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';
@Component({
    selector: 'mn-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, ButtonModule, FontAwesomeModule, RouterLink, RecaptchaV3Module],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, OnDestroy {
    registerForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
            condition: new FormControl(Boolean, [Validators.required, Validators.requiredTrue]),
        },
        { validators: confirmPasswordValidator.bind(this) }
    );
    faPenToSquare = faPenToSquare;
    loading: boolean = false;
    userDto: createUserDto;
    loginDto: LoginDto;
    errorMessage: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private signInService: SignInService,
        private recaptchaV3Service: ReCaptchaV3Service,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.authService.isAuth.subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.authService.redirect();
            }
        });

        this.renderer.addClass(document.body, 'recaptcha');
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'recaptcha');
    }

    redirectToHome() {
        this.router.navigate(['/home']);
    }

    register() {
        this.loading = true;

        const { name, surname, email, password } = this.registerForm.value;

        this.userDto = { name: name!, surname: surname!, email: email!, password: password! };
        this.loginDto = { email: email!, password: password! };

        this.recaptchaV3Service.execute('register').subscribe({
            next: (token: string) => {
                this.signInService.register(this.userDto).subscribe({
                    next: (res: User | any) => {
                        this.authService.login(this.loginDto).subscribe({
                            next: (res: AccessToken | any) => {
                                // Redirection vers la page d'attente
                                this.router.navigateByUrl('awaiting-mail');
                            },
                            error: (err: any) => {
                                this.loading = false;
                                this.errorMessage = err.error.errors[0].message;
                            },
                        });
                    },
                    error: (err: any) => {
                        this.loading = false;
                        this.errorMessage = err.error.errors[0].message;
                    },
                });
            },

            error: (err: any) => {
                this.errorMessage = err;
            },
        });
    }
}

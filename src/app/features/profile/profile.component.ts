import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { User } from '../../shared/interfaces/user.interface';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { confirmPasswordValidator } from '../../shared/validators/confirm-password.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'mn-profile',
    standalone: true,
    imports: [ModalComponent, ButtonModule, ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    profile: User;
    visible: boolean = false;
    loading: boolean = false;
    userId: string | null;

    profileForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.email]),
            password: new FormControl('', [Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
        },
        { validators: confirmPasswordValidator.bind(this) }
    );
    constructor(private userService: UserService, private authService: AuthService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        this.userId = this.authService.getUserId();
        if (this.userId) {
            this.userService.get(this.userId).subscribe({
                next: (res: User) => {
                    this.profile = res;
                    this.profileForm.patchValue(res);
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
    }

    showDialog() {
        this.visible = !this.visible;
    }

    removeEmptyFields(): object {
        // Cloner les valeurs du formulaire
        const formValues: any = { ...this.profileForm.value };

        // Supprimer les champs vides
        Object.keys(formValues).forEach((key) => {
            if (!formValues[key]) {
                delete formValues[key];
            }
        });

        if (formValues.confirmPassword) {
            delete formValues.confirmPassword;
        }

        return formValues;
    }

    onSubmit(): void {
        this.loading = true;

        const fieldsToUpdate = this.removeEmptyFields();

        if (this.userId) {
            this.userService.update(this.userId, fieldsToUpdate).subscribe({
                next: (res: any) => {
                    this.loading = false;
                    this.toastr.success('Profil mis à jour');
                },
                error: (res: any) => {
                    this.loading = false;
                    this.toastr.error('Une erreur est survenue');
                    console.log('error', res);
                },
            });
        }
    }

    onDelete(): void {
        if (this.userId) {
            this.userService.delete(this.userId).subscribe({
                next: (res: any) => {
                    this.loading = false;
                    this.authService.logout();
                },
                error: (res: any) => {
                    this.loading = false;
                    console.log('error', res);
                },
            });
        }
    }
}

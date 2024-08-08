import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { NurseryService } from '../nursery.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user/user.service';
import { User } from '../../../shared/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'mn-nursery-form',
    standalone: true,
    imports: [ButtonModule, FileUploadModule, ToastModule, ReactiveFormsModule, FormsModule, CommonModule],
    providers: [NurseryService],
    templateUrl: './nursery-form.component.html',
    styleUrl: './nursery-form.component.scss',
})
export class NurseryFormComponent implements OnInit {
    loading: boolean = false;
    selectedLogo: File | null;
    listPotentialOwners: User[] = [];
    logoErrorMessage: string;

    constructor(
        private nurseryService: NurseryService,
        private router: Router,
        private userService: UserService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.userService.getPotentialOwners().subscribe({
            next: (res: User[]) => {
                this.listPotentialOwners = res;
            },
        });
    }

    nurseryForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        location: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]),
        total_children: new FormControl('', [Validators.required, Validators.min(0)]),
        logo: new FormControl(null),
        owner: new FormControl('', [Validators.required]),
    });

    public get form() {
        return this.nurseryForm.controls;
    }

    onFileChange(event: any): void {
        this.selectedLogo = event.target.files[0];
    }

    onSubmit(): void {
        this.loading = true;
        const formData = new FormData();
        const formControls = this.nurseryForm.controls;

        if (this.selectedLogo) {
            formData.append('logo', this.selectedLogo);
        }
        if (
            formControls.name?.value != null &&
            formControls.location?.value != null &&
            formControls.total_children?.value != null &&
            formControls.owner?.value != null
        ) {
            formData.append('name', formControls.name.value);
            formData.append('location', formControls.location.value);
            formData.append('total_children', formControls.total_children.value);
            formData.append('owner', formControls.owner.value);

            this.nurseryService.create(formData).subscribe({
                next: (res: Nursery) => {
                    const idStringify = res.id.toString();
                    this.router.navigate(['/admin/nurseries', idStringify]);
                },
                error: (res: any) => {
                    console.log('error', res);
                    this.toastr.error('Une erreur est survenue pendant la création de la crèche');
                },
            });
        }
    }
}

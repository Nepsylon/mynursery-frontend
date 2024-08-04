import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../nursery.service';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../user/user.service';
import { User } from '../../../shared/interfaces/user.interface';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'mn-nursery-details',
    standalone: true,
    imports: [ButtonModule, FileUploadModule, ToastModule, ReactiveFormsModule, FormsModule, CommonModule],
    providers: [NurseryService],
    templateUrl: './nursery-details.component.html',
    styleUrl: './nursery-details.component.scss',
})
export class NurseryDetailsComponent implements OnInit {
    loading: boolean = false;
    selectedLogo: File | null;
    listPotentialOwners: User[] = [];
    nursery: Nursery;

    constructor(
        private nurseryService: NurseryService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const nurseryId = this.route.snapshot.params['id'];
        this.nurseryService.get(nurseryId).subscribe({
            next: (data: Nursery) => {
                this.nursery = data;
                this.nurseryForm.patchValue({
                    name: data.name,
                    location: data.location,
                    total_children: data.total_children?.toString(),
                    owner: data.owner?.name,
                });
                console.log(this.nurseryForm.value);
            },
            error: (error) => {
                console.error('Une erreur est survenue pendant la requête', error);
            },
        });

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

        owner: new FormControl('', [Validators.required]),
    });

    logoForm = new FormGroup({
        logo: new FormControl(null),
    });

    public get form() {
        return this.nurseryForm.controls;
    }

    onFileChange(event: any): void {
        this.selectedLogo = event.target.files[0];
    }

    onUpdate(): void {
        this.loading = true;
        const nurseryId = this.route.snapshot.params['id'];
        this.nurseryService.update(nurseryId, this.nurseryForm.value).subscribe({
            next: (res: any) => {
                this.loading = false;
                console.log('Update successful', res);
            },
            error: (res: any) => {
                console.log('error', res);
            },
        });
    }

    onDelete(): void {
        const nurseryId = this.route.snapshot.params['id'];
        this.nurseryService.delete(nurseryId).subscribe({
            next: (res: any) => {
                this.loading = false;
                console.log('Update successful', res);
                this.router.navigate(['/admin/nurseries']);
            },
            error: (res: any) => {
                console.log('error', res);
            },
        });
    }

    onUpload(): void {
        const formData = new FormData();
        const nurseryId = this.route.snapshot.params['id'];
        if (this.selectedLogo) {
            formData.append('logo', this.selectedLogo);
        }
        this.nurseryService.update(nurseryId, formData).subscribe({
            next: (res: any) => {
                console.log('Update successful', res);
            },
            error: (res: any) => {
                console.log('error', res);
            },
        });
    }
}

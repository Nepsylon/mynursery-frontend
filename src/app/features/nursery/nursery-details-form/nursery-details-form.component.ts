import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { User } from '../../../shared/interfaces/user.interface';
import { NurseryService } from '../nursery.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'mn-nursery-details-form',
    standalone: true,
    imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ModalComponent, RadioButtonModule],
    templateUrl: './nursery-details-form.component.html',
    styleUrl: './nursery-details-form.component.scss',
})
export class NurseryDetailsFormComponent implements OnInit, OnChanges {
    @Input() nurseryId: string;
    @Input() nursery: Nursery;
    loading: boolean = false;
    selectedLogo: File | null;
    listPotentialOwners: User[];

    nurseryForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        location: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]),
        total_children: new FormControl('', [Validators.required, Validators.min(0)]),
        owner: new FormControl<number>(0, [Validators.required]),
    });

    logoForm = new FormGroup({
        logo: new FormControl(null),
    });

    constructor(
        private nurseryService: NurseryService,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.updateForm(this.nursery);
        this.getPotentialOwners();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['nursery'] && changes['nursery'].currentValue) {
            this.updateForm(changes['nursery'].currentValue);
        }
    }

    updateForm(nursery: Nursery): void {
        this.nurseryForm.patchValue({
            name: nursery.name,
            location: nursery.location,
            total_children: nursery.total_children?.toString(),
            owner: nursery.owner?.id,
        });
    }

    getPotentialOwners(): void {
        this.userService.getPotentialOwners().subscribe({
            next: (res: User[]) => {
                this.listPotentialOwners = res;
            },
        });
    }

    public get form() {
        return this.nurseryForm.controls;
    }

    onFileChange(event: any): void {
        this.selectedLogo = event.target.files[0];
    }

    onUpdate(): void {
        this.loading = true;
        this.nurseryService.update(this.nurseryId, this.nurseryForm.value).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Crèche mise à jour');
            },
            error: (res: any) => {
                this.loading = false;
                console.log('error', res);
                this.toastr.error('Une erreur est survenue pendant la mise à jour des informations');
            },
        });
    }

    onDelete(): void {
        this.loading = true;
        this.nurseryService.delete(this.nurseryId).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Crèche supprimée');
                this.router.navigate(['/admin/nurseries']);
            },
            error: (res: any) => {
                this.loading = false;
                console.error('error', res);
                this.toastr.error('Une erreur est survenue pendant la suppression');
            },
        });
    }

    onUpload(): void {
        const formData = new FormData();
        if (this.selectedLogo) {
            formData.append('logo', this.selectedLogo);
        }
        console.log(this.selectedLogo);
        this.nurseryService.updateLogo(this.nurseryId, formData).subscribe({
            next: (res: any) => {
                this.toastr.success('Image sauvegardée');
            },
            error: (res: any) => {
                console.log('error', res);
                this.toastr.error('Une erreur est survenue');
            },
        });
    }
}

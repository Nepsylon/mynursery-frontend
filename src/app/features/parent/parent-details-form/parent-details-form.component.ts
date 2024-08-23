import { Component, Input, SimpleChanges } from '@angular/core';
import { parentService } from '../parent.service';
import { Router } from '@angular/router';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildService } from '../../child/child.service';
import { ToastrService } from 'ngx-toastr';
import { Child } from '../../../shared/interfaces/child.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'mn-parent-details-form',
    standalone: true,
    imports: [MultiSelectModule, ButtonModule, ModalComponent, ReactiveFormsModule, InputMaskModule, InputTextModule],
    templateUrl: './parent-details-form.component.html',
    styleUrl: './parent-details-form.component.scss',
})
export class ParentDetailsFormComponent {
    @Input() parent: Parent;
    @Input() parentId: string;
    loading: boolean = false;
    listPotentialChildren: Child[];

    parentForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', Validators.required),
        children: new FormControl<Child[] | number[]>([], [Validators.required]),
    });

    constructor(
        private childService: ChildService,
        private parentService: parentService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.updateForm(this.parent);
        this.getPotentialChildren();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['parent'] && changes['parent'].currentValue) {
            this.updateForm(changes['parent'].currentValue);
        }
    }

    getPotentialChildren(): void {
        this.childService.getAll().subscribe({
            next: (res: Child[]) => {
                this.listPotentialChildren = res;
            },
        });
    }

    updateForm(parent: Parent): void {
        this.parentForm.patchValue({
            name: parent.name,
            surname: parent.surname,
            email: parent.email,
            phone: parent.phone,
            children: parent?.children,
        });
    }

    onUpdate(): void {
        this.loading = true;
        const childrenIds: number[] = (this.parentForm.value.children as Child[]).map((child) => child.id);
        this.parentForm.value.children = childrenIds;
        this.parentService.update(this.parentId, this.parentForm.value).subscribe({
            next: (res: any) => {
                if (res.affected > 0) {
                    this.loading = false;
                    this.toastr.success('Parent mis à jour');
                }
            },
            error: (res: any) => {
                this.loading = false;
                this.toastr.error('Une erreur est survenue pendant la mise à jour des informations');
            },
        });
    }
    onDelete(): void {
        this.loading = true;
        this.parentService.delete(this.parentId).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Parent supprimé');
                this.router.navigate(['/admin/parents']);
            },
            error: (res: any) => {
                this.loading = false;
                console.error('error', res);
                this.toastr.error('Une erreur est survenue pendant la suppression');
            },
        });
    }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { TagModule } from 'primeng/tag';
import { Child } from '../../../shared/interfaces/child.interface';
import { ConfirmationService } from 'primeng/api';
import { ChildService } from '../../child/child.service';
import { ToastrService } from 'ngx-toastr';
import { parentService } from '../parent.service';
import { Parent } from '../../../shared/interfaces/parent.interface';

@Component({
    selector: 'mn-parent-form',
    standalone: true,
    imports: [
        DialogModule,
        ConfirmDialogModule,
        InputNumberModule,
        TagModule,
        DropdownModule,
        ReactiveFormsModule,
        InputTextModule,
        MultiSelectModule,
        InputMaskModule,
    ],
    templateUrl: './parent-form.component.html',
    styleUrl: './parent-form.component.scss',
    providers: [ConfirmationService],
})
export class ParentFormComponent {
    @Output() onCreate = new EventEmitter<void>();
    parentDialog: boolean = false;
    listPotentialChildren: Child[];

    parentForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', Validators.required),
        children: new FormControl<number[]>([]),
    });
    constructor(
        private confirmationService: ConfirmationService,
        private childService: ChildService,
        private toastr: ToastrService,
        private parentService: parentService
    ) {}

    openNew() {
        this.parentDialog = true;
        this.getPotentialChildren();
    }

    hideDialog() {
        this.parentDialog = false;
    }

    getPotentialChildren(): void {
        this.childService.getAll().subscribe({
            next: (res: Child[]) => {
                this.listPotentialChildren = res;
            },
        });
    }

    saveParent() {
        this.parentService.create(this.parentForm.value).subscribe({
            next: (res: Parent) => {
                this.toastr.success('Parent créé avec succès !');
                this.parentDialog = false;
                this.onCreate.emit();
            },
            error: (err) => {
                this.toastr.error('Une erreur est survenue pendant la création');
            },
        });
    }
}

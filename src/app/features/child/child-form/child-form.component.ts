import { Component, EventEmitter, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Child } from '../../../shared/interfaces/child.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ChildService } from '../child.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'mn-child-form',
    standalone: true,
    imports: [
        DialogModule,
        ConfirmDialogModule,
        InputNumberModule,
        TagModule,
        DropdownModule,
        RadioButtonModule,
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
    ],
    templateUrl: './child-form.component.html',
    styleUrl: './child-form.component.scss',
    providers: [ConfirmationService],
})
export class ChildFormComponent {
    @Output() onCreate = new EventEmitter<void>();
    childDialog: boolean = false;

    childForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        gender: new FormControl('male'),
        age: new FormControl(null, Validators.required),
        startDateContract: new FormControl(null, Validators.required),
        endDateContract: new FormControl(null, Validators.required),
    });
    constructor(private confirmationService: ConfirmationService, private childService: ChildService, private toastr: ToastrService) {}

    openNew() {
        this.childDialog = true;
    }

    hideDialog() {
        this.childDialog = false;
    }

    saveChild() {
        this.childService.create(this.childForm.value).subscribe({
            next: (res: Child) => {
                this.toastr.success('Enfant ajouté avec succès !');
                this.childDialog = false;
                this.onCreate.emit();
            },
            error: (err) => {
                this.toastr.error('Une erreur est survenue pendant la création');
            },
        });
    }
}

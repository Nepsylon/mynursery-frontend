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
import { NurseryService } from '../../nursery/nursery.service';
import { parentService } from '../../parent/parent.service';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { AuthService } from '../../../core/auth/services/auth.service';
import { UserService } from '../../user/user.service';

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
        MultiSelectModule,
    ],
    templateUrl: './child-form.component.html',
    styleUrl: './child-form.component.scss',
    providers: [ConfirmationService],
})
export class ChildFormComponent {
    @Output() onCreate = new EventEmitter<void>();
    childDialog: boolean = false;
    listPotentialParents: Parent[];
    listPotentialNurseries: Nursery[];
    userId: string | null;
    userRole: string | null;

    childForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        gender: new FormControl('male'),
        age: new FormControl(null, Validators.required),
        startDateContract: new FormControl(null, Validators.required),
        endDateContract: new FormControl(null, Validators.required),
        nursery: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
        // parents: new FormControl<number[]>([], Validators.required),
    });
    constructor(
        private confirmationService: ConfirmationService,
        private childService: ChildService,
        private toastr: ToastrService,
        private parentService: parentService,
        private nurseryService: NurseryService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    openNew() {
        this.userId = this.authService.getUserId();
        this.userRole = this.authService.getUserRole();
        this.childDialog = true;
        this.getPotentialNurseries();
        this.getPotentialParents();
    }

    hideDialog() {
        this.childDialog = false;
    }

    getPotentialNurseries(): void {
        switch (this.userRole) {
            case 'admin':
                this.nurseryService.getAll().subscribe({
                    next: (res: Nursery[]) => {
                        this.listPotentialNurseries = res;
                    },
                });
                break;
            case 'owner':
                this.userId = this.authService.getUserId() || '0';
                if (this.userId) {
                    this.nurseryService.getNurseriesByOwner(this.userId).subscribe({
                        next: (res: Nursery[]) => {
                            this.listPotentialNurseries = res;
                        },
                    });
                }
                break;

            case 'user':
                this.userId = this.authService.getUserId() || '0';
                if (this.userId) {
                    this.nurseryService.getWorkplacesByUser(this.userId).subscribe({
                        next: (res: Nursery[]) => {
                            this.listPotentialNurseries = res;
                        },
                    });
                }
                break;
        }
    }

    getPotentialParents(): void {
        this.parentService.getAll().subscribe({
            next: (res: Parent[]) => {
                this.listPotentialParents = res;
            },
        });
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

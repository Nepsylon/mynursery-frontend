import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { EmployeeService } from '../employee.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';
import { NurseryService } from '../../nursery/nursery.service';
import { createUserDto } from '../../../core/auth/interfaces/create-user.dto';
import { Role } from '../../../core/auth/enums/role.enum';
import { AuthService } from '../../../core/auth/services/auth.service';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'mn-employee-form',
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
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss',
    providers: [ConfirmationService],
})
export class EmployeeFormComponent implements OnInit {
    @Output() onCreate = new EventEmitter<void>();
    employeeDialog: boolean = false;
    listWorkplaces: Nursery[] = [];
    listPotentialOwnerWorkplaces: Nursery[] = [];
    userRole: string | null;
    userId: string | null;

    employeeForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
            workplaces: new FormControl<number[]>([], Validators.required),
            role: new FormControl('user'),
        },
        { validators: confirmPasswordValidator.bind(this) }
    );

    constructor(
        private confirmationService: ConfirmationService,
        private employeeService: EmployeeService,
        private authService: AuthService,
        private userService: UserService,
        private toastr: ToastrService,
        private nurseryService: NurseryService
    ) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
    }

    openNew() {
        this.employeeDialog = true;
        this.getPotentialNurseries();
    }

    hideDialog() {
        this.employeeDialog = false;
    }

    getPotentialNurseries(): void {
        switch (this.userRole) {
            case 'admin':
                this.nurseryService.getAll().subscribe({
                    next: (res: Nursery[]) => {
                        this.listWorkplaces = res;
                    },
                });
                break;
            case 'owner':
                this.userId = this.authService.getUserId() || '0';
                if (this.userId) {
                    this.userService.getNurseriesByOwner(this.userId).subscribe({
                        next: (res: Nursery[]) => {
                            this.listWorkplaces = res;
                        },
                    });
                }
                break;
        }
    }

    saveEmployee() {
        this.employeeService.create(this.employeeForm.value).subscribe({
            next: (res: Employee) => {
                this.toastr.success('Employé ajouté avec succès !');
                this.employeeDialog = false;
                this.onCreate.emit();
            },
            error: (err) => {
                this.toastr.error('Une erreur est survenue pendant la création');
            },
        });
    }
}

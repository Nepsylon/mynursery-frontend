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
export class EmployeeFormComponent {
    @Output() onCreate = new EventEmitter<void>();
    employeeDialog: boolean = false;
    listPotentialNurseries: Nursery[];
    userDto: createUserDto;

    employeeForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
            //nursery: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
            role: new FormControl('user'),
        },
        { validators: confirmPasswordValidator.bind(this) }
    );

    constructor(
        private confirmationService: ConfirmationService,
        private employeeService: EmployeeService,
        private toastr: ToastrService,
        private nurseryService: NurseryService
    ) {}

    openNew() {
        this.employeeDialog = true;
        this.getPotentialNurseries();
    }

    hideDialog() {
        this.employeeDialog = false;
    }

    getPotentialNurseries(): void {
        this.nurseryService.getAll().subscribe({
            next: (res: Nursery[]) => {
                this.listPotentialNurseries = res;
            },
        });
    }

    saveEmployee() {
        const { name, surname, email, password, role } = this.employeeForm.value;
        this.userDto = { name: name!, surname: surname!, email: email!, password: password!, role: role! };
        console.log(this.userDto);
        this.employeeService.create(this.userDto).subscribe({
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

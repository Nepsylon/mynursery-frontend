import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'mn-employee-details-form',
    standalone: true,
    imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ModalComponent, RadioButtonModule, CalendarModule, MultiSelectModule],
    templateUrl: './employee-details-form.component.html',
    styleUrl: './employee-details-form.component.scss',
})
export class EmployeeDetailsFormComponent {
    @Input() employee: Employee;
    @Input() employeeId: string;
    loading: boolean = false;

    employeeForm = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            // confirmPassword: new FormControl(''),
            // //nursery: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
            // role: new FormControl('user'),
        },
        { validators: confirmPasswordValidator.bind(this) }
    );

    constructor(private employeeService: EmployeeService, private toastr: ToastrService, private router: Router) {}

    ngOnInit(): void {
        this.updateForm(this.employee);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['employee'] && changes['employee'].currentValue) {
            this.updateForm(changes['employee'].currentValue);
        }
    }

    public get form() {
        return this.employeeForm.controls;
    }

    updateForm(employee: Employee): void {
        this.employeeForm.patchValue({
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
        });
    }

    onUpdate(): void {
        this.loading = true;

        this.employeeService.update(this.employeeId, this.employeeForm.value).subscribe({
            next: (res: any) => {
                if (res.affected > 0) {
                    this.loading = false;
                    this.toastr.success('Enfant mis à jour');
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
        this.employeeService.delete(this.employeeId).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Employé mis à jour');
                this.router.navigate(['/admin/employees']);
            },
            error: (res: any) => {
                this.loading = false;
                console.error('error', res);
                this.toastr.error('Une erreur est survenue pendant la suppression');
            },
        });
    }
}

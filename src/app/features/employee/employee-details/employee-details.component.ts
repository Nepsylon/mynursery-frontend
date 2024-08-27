import { Component, OnInit } from '@angular/core';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
import { EmployeeDetailsFormComponent } from '../employee-details-form/employee-details-form.component';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
    selector: 'mn-employee-details',
    standalone: true,
    imports: [NotFoundComponent, NgxSkeletonLoaderModule, EmployeeDetailsFormComponent],
    templateUrl: './employee-details.component.html',
    styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
    employee: Employee;
    employeeId: string;
    error: boolean;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.employeeId = params['id'];
            this.getEmployeeDetails();
        });
    }

    getEmployeeDetails() {
        this.employeeService.get(this.employeeId).subscribe({
            next: (data: Employee) => {
                this.employee = data;
                this.error = false;
            },
            error: (err) => {
                this.error = true;
            },
        });
    }
}

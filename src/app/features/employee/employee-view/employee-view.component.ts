import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EmployeeService } from '../employee.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { EmployeeListComponent } from '../employees-list/employee-list.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
    selector: 'mn-employee-view',
    standalone: true,
    imports: [
        PaginatorModule,
        RouterLink,
        ButtonModule,
        EmptyComponent,
        NgxSkeletonLoaderModule,
        EmployeeListComponent,
        EmployeeFormComponent,
    ],
    templateUrl: './employee-view.component.html',
    styleUrl: './employee-view.component.scss',
})
export class EmployeeViewComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    @Output() onCreate = new EventEmitter<void>();
    employees: Employee[] = [];
    userRole: string | null;
    totalCount: number = 0;
    first: number = 0;
    rows: number = 5;
    page: number = 0;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private employeeService: EmployeeService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.generateEmployees(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generateEmployees(pageNumber: number, offset: number) {
        this.employeeService.getEmployeesPaginated(pageNumber, offset).subscribe({
            next: (data: PaginatedItems) => {
                this.employees = data.items;
                this.totalCount = data.totalCount;
            },
        });
    }

    refreshEmployees(numberToDelete?: number) {
        const parentsLength = this.employees.length;
        switch (parentsLength) {
            case 1:
                this.page -= 1;
                break;
            case numberToDelete:
                this.page -= 1;
                break;
        }
        this.generateEmployees(this.page, this.rows);
        this.changePageTo(this.page);
        this.ngOnInit();
    }

    onCreateRefresh() {
        this.onCreate.emit();
        this.ngOnInit();
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.page = event.page;
        this.generateEmployees(this.page, this.rows);
    }

    // Change page programmatically to a specific page
    changePageTo(page: number) {
        this.paginator.changePage(page); // 'page' is 0-based index, so for page 1, pass 0.
    }
}

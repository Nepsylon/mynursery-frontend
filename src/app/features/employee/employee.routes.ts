import { Routes } from '@angular/router';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const employeeRoutes: Routes = [
    {
        path: '',
        component: EmployeeViewComponent,
    },
    {
        path: ':id',
        component: EmployeeDetailsComponent,
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

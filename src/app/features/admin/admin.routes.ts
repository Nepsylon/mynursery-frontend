import { Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProfileComponent } from '../profile/profile.component';
import { ArchivesViewComponent } from '../archives/archives-view/archives-view.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: BoardAdminComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'archives',
                component: ArchivesViewComponent,
            },
            {
                path: 'children',
                loadChildren: () => import('../child/child.routes').then((m) => m.childRoutes),
            },
            {
                path: 'nurseries',
                loadChildren: () => import('../nursery/nursery.routes').then((m) => m.nurseryRoutes),
            },
            {
                path: 'parents',
                loadChildren: () => import('../parent/parent.routes').then((m) => m.parentRoutes),
            },
            {
                path: 'employees',
                loadChildren: () => import('../employee/employee.routes').then((m) => m.employeeRoutes),
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

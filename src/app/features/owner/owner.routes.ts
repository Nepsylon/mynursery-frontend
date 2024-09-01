import { Routes } from '@angular/router';
import { BoardOwnerComponent } from './board-owner/board-owner.component';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';
import { ActivityComponent } from '../activity/activity.component';

export const ownerRoutes: Routes = [
    {
        path: '',
        component: BoardOwnerComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
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
            {
                path: 'activities',
                component: ActivityComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

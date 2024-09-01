import { Routes } from '@angular/router';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from '../profile/profile.component';
import { ActivityComponent } from '../activity/activity.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';

export const userRoutes: Routes = [
    {
        path: '',
        component: BoardUserComponent,
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
                path: 'parents',
                loadChildren: () => import('../parent/parent.routes').then((m) => m.parentRoutes),
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

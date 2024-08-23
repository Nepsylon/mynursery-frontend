import { Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProfileComponent } from '../profile/profile.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: BoardAdminComponent,
        children: [
            {
                path: '',
                component: HomeAdminComponent,
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

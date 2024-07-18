import { Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

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
                path: 'nurseries',
                loadChildren: () => import('../nursery/nursery.routes').then((m) => m.nurseryRoutes),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

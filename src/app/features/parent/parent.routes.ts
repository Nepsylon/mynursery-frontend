import { Routes } from '@angular/router';
import { ParentViewComponent } from './parent-view/parent-view.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';

export const parentRoutes: Routes = [
    {
        path: '',
        component: ParentViewComponent,
    },
    // {
    //     path: 'create',
    //     component: NurseryFormComponent,
    // },
    {
        path: ':id',
        component: ParentDetailsComponent,
    },
    { path: '**', redirectTo: '' },
];

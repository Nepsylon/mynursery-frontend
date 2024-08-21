import { Routes } from '@angular/router';
import { ParentViewComponent } from './parent-view/parent-view.component';

export const parentRoutes: Routes = [
    {
        path: '',
        component: ParentViewComponent,
    },
    // {
    //     path: 'create',
    //     component: NurseryFormComponent,
    // },
    // {
    //     path: ':id',
    //     component: NurseryDetailsComponent,
    // },
    { path: '**', redirectTo: '' },
];

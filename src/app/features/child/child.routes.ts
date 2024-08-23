import { Routes } from '@angular/router';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { ChildViewComponent } from './child-view/child-view.component';
import { ChildFormComponent } from './child-form/child-form.component';

export const childRoutes: Routes = [
    {
        path: '',
        component: ChildViewComponent,
    },
    // {
    //     path: 'create',
    //     component: ChildFormComponent,
    // },
    {
        path: ':id',
        component: ChildDetailsComponent,
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

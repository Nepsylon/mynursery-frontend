import { Routes } from '@angular/router';
import { NurseryViewComponent } from './nursery-view/nursery-view.component';
import { NurseryDetailsComponent } from './nursery-details/nursery-details.component';
import { NurseryFormComponent } from './nursery-form/nursery-form.component';

export const nurseryRoutes: Routes = [
    {
        path: '',
        component: NurseryViewComponent,
    },
    {
        path: 'create',
        component: NurseryFormComponent,
    },
    {
        path: ':id',
        component: NurseryDetailsComponent,
    },
    { path: '**', redirectTo: '' },
];

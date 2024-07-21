import { Routes } from '@angular/router';
import { NurseryViewComponent } from './nursery-view/nursery-view.component';
import { NurseryDetailsComponent } from './nursery-details/nursery-details.component';

export const nurseryRoutes: Routes = [
    {
        path: '',
        component: NurseryViewComponent,
    },
    {
        path: ':id',
        component: NurseryDetailsComponent,
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

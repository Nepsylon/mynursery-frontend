import { Routes } from '@angular/router';
import { NurseryViewComponent } from './nursery-view/nursery-view.component';
import { NurseryDetailsComponent } from './nursery-details/nursery-details.component';

export const nurseryRoutes: Routes = [
    {
        path: 'pages',
        component: NurseryViewComponent,
    },
    {
        path: 'selected/:id',
        component: NurseryDetailsComponent,
    },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];

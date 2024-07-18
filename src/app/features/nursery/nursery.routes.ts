import { Routes } from '@angular/router';
import { NurseryViewComponent } from './nursery-view/nursery-view.component';
import { NurseryDetailsComponent } from './nursery-details/nursery-details.component';

export const nurseryRoutes: Routes = [
    { path: '', redirectTo: 'page/1', pathMatch: 'full' },
    {
        path: 'page/:index',
        component: NurseryViewComponent,
    },
    {
        path: 'selected/:id',
        component: NurseryDetailsComponent,
    },
    { path: '**', redirectTo: 'page/1' },
];

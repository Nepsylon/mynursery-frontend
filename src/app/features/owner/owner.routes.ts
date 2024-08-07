import { Routes } from '@angular/router';
import { BoardOwnerComponent } from './board-owner/board-owner.component';
import { ProfileComponent } from '../profile/profile.component';

export const ownerRoutes: Routes = [
    {
        path: '',
        component: BoardOwnerComponent,
        children: [{ path: 'profile', component: ProfileComponent }],
    },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { Role } from './core/auth/enums/role.enum';
import { HomeComponent } from './core/home/home.component';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { AwaitingEmailVerificationComponent } from './shared/awaiting-email-verification/awaiting-email-verification.component';
import { ConditionComponent } from './features/condition-terms/condition-terms.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'sign-in',
        component: SignInComponent,
    },
    {
        path: 'awaiting-mail',
        component: AwaitingEmailVerificationComponent,
    },

    {
        path: 'conditions',
        component: ConditionComponent,
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
    },
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
    },
    {
        path: 'owner',
        canActivate: [authGuard, roleGuard],
        data: { roles: [Role.Owner] },
        loadChildren: () => import('./features/owner/owner.routes').then((m) => m.ownerRoutes),
    },
    {
        path: 'user',
        canActivate: [authGuard, roleGuard],
        data: { roles: [Role.User] },
        loadChildren: () => import('./features/user/user.routes').then((m) => m.userRoutes),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

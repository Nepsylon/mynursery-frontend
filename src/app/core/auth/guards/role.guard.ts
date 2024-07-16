import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getUserRole();

    const allowedRoles = route.data['roles'] as Array<string | null>;

    if (allowedRoles.includes(role)) {
        return true;
    }

    router.navigateByUrl('');
    return false;
};

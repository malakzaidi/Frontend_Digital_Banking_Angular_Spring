import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tokenPayload = authService.decodeToken();
  if (tokenPayload && tokenPayload.roles && tokenPayload.roles.includes('ROLE_ADMIN')) {
    return true;
  }
  router.navigate(['/unauthorized']);
  return false;
};

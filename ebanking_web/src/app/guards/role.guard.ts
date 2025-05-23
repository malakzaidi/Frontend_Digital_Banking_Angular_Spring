import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tokenPayload = this.authService.decodeToken();
    const isAdmin = tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
    const expectedRole = route.data['expectedRole'];

    if (expectedRole === 'ROLE_ADMIN' && !isAdmin) {
      this.router.navigate(['/unauthorized']);
      return false;
    } else if (expectedRole === 'ROLE_USER' && isAdmin) {
      this.router.navigate(['/dashboard']); // Redirect admins away from user-only pages
      return false;
    }
    return true;
  }
}

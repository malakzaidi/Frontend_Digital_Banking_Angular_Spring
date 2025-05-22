import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Deny access during SSR
    }

    const tokenPayload = this.authService.decodeToken();
    const isAdmin = tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
    if (!isAdmin) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}

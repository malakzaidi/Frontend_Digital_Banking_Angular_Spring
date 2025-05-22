import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar class="navbar">
      <span class="logo">Digital Banking</span>
      <div class="nav-links">
        <a *ngIf="authService.isAuthenticated()" routerLink="/home">Home</a>
        <a *ngIf="authService.isAuthenticated() && isAdmin()" routerLink="/dashboard">Dashboard</a>
        <a *ngIf="authService.isAuthenticated()" routerLink="/accounts">Accounts</a>
        <a *ngIf="authService.isAuthenticated()" routerLink="/transactions">Transactions</a>
        <a *ngIf="authService.isAuthenticated()" routerLink="/transfer">Transfer</a>
        <a *ngIf="authService.isAuthenticated()" routerLink="/change-password">Change Password</a>
        <a *ngIf="authService.isAuthenticated()" (click)="logout()">Logout</a>
        <a *ngIf="!authService.isAuthenticated()" routerLink="/login">Login</a>
        <a *ngIf="!authService.isAuthenticated()" routerLink="/register">Register</a>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background-color: #00695C;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .logo {
      font-family: 'DM Serif Display', serif;
      font-size: 1.8rem;
      font-weight: 400;
      color: #FFFFFF;
    }
    .nav-links {
      display: flex;
      gap: 20px;
    }
    .nav-links a {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      color: #FFFFFF;
      transition: color 0.3s ease;
    }
    .nav-links a:hover {
      color: #FF6F61;
    }
    @media (max-width: 768px) {
      .nav-links {
        gap: 10px;
        flex-wrap: wrap;
      }
      .nav-links a {
        font-size: 0.9rem;
      }
      .logo {
        font-size: 1.5rem;
      }
    }
  `]
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isAdmin(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const tokenPayload = this.authService.decodeToken();
    return tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

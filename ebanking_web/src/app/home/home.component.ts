import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BankingService } from '../services/banking.service';
import { BankAccountDTO } from '../banking-dtos';
import { Observable, catchError, of, map, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="homepage">
      <!-- Header Section with Sign Up/Sign In -->
      <header class="header">
        <div class="logo">Digital Banking</div>
        <div class="auth-buttons" *ngIf="!authService.isAuthenticated()">
          <a routerLink="/login" class="auth-btn sign-in">Sign In</a>
          <a routerLink="/register" class="auth-btn sign-up">Sign Up</a>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero">
        <h1>Banking Made Simple and Secure</h1>
        <p class="subtitle">Manage your finances with ease. Secure, fast, and reliable online banking for all your needs.</p>
        <div class="cta-buttons" *ngIf="!authService.isAuthenticated()">
          <a routerLink="/register" class="cta-btn">Get Started</a>
        </div>
      </section>

      <!-- Role-Based Dashboard (After Login) -->
      <section class="dashboard" *ngIf="authService.isAuthenticated()">
        <h2>Welcome, {{ userName }}!</h2>
        <p class="dashboard-subtitle">Check your quick stats and alerts below.</p>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-card">
            <h3>Total Balance</h3>
            <p *ngIf="totalBalance$ | async as totalBalance; else loading">
              {{ totalBalance | currency:'USD' }}
            </p>
            <ng-template #loading>
              <p>Loading...</p>
            </ng-template>
          </div>
        </div>

        <!-- Alerts -->
        <div class="alerts">
          <div class="alert-card" *ngIf="showAlert">
            <p>Alert: You have a pending bill payment due tomorrow!</p>
          </div>
          <div class="alert-card" *ngIf="!showAlert">
            <p>No alerts at this time.</p>
          </div>
        </div>
      </section>

      <!-- Features Section (Before Login) -->
      <section class="features" *ngIf="!authService.isAuthenticated()">
        <h2>Why Choose Us?</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <h3>Secure Banking</h3>
            <p>Top-notch security to protect your funds and data.</p>
          </div>
          <div class="feature-card">
            <h3>Fast Transactions</h3>
            <p>Instant transfers and payments at your fingertips.</p>
          </div>
          <div class="feature-card">
            <h3>24/7 Support</h3>
            <p>Our team is here to assist you anytime.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .homepage {
      font-family: 'Roboto', sans-serif;
      color: #333;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      background-color: #00695C;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo {
      font-family: 'DM Serif Display', serif;
      font-size: 2rem;
      color: #FFFFFF;
    }
    .auth-buttons {
      display: flex;
      gap: 15px;
    }
    .auth-btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: 500;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .sign-in {
      background-color: #FF6F61;
    }
    .sign-in:hover {
      background-color: #E65A50;
    }
    .sign-up {
      background-color: #0288D1;
    }
    .sign-up:hover {
      background-color: #0277BD;
    }
    .hero {
      text-align: center;
      padding: 80px 20px;
      background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c') no-repeat center/cover;
      color: #FFFFFF;
      position: relative;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .hero h1, .hero p, .hero .cta-buttons {
      position: relative;
      z-index: 1;
    }
    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      font-family: 'DM Serif Display', serif;
    }
    .subtitle {
      font-size: 1.5rem;
      margin-bottom: 30px;
      max-width: 600px;
      margin: 0 auto 30px;
    }
    .cta-btn {
      padding: 15px 30px;
      background-color: #FF6F61;
      color: #FFFFFF;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }
    .cta-btn:hover {
      background-color: #E65A50;
    }
    .dashboard {
      padding: 50px 20px;
      text-align: center;
    }
    .dashboard h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-family: 'DM Serif Display', serif;
    }
    .dashboard-subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 40px;
    }
    .quick-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto 40px;
    }
    .stat-card {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .stat-card h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #00695C;
    }
    .stat-card p {
      font-size: 1.2rem;
      color: #333;
    }
    .alerts {
      max-width: 1200px;
      margin: 0 auto;
    }
    .alert-card {
      background-color: #FFF3E0;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 10px;
      color: #E65100;
      text-align: center;
    }
    .features {
      padding: 50px 20px;
      text-align: center;
      background-color: #FFFFFF;
    }
    .features h2 {
      font-size: 2.5rem;
      margin-bottom: 40px;
      font-family: 'DM Serif Display', serif;
    }
    .feature-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .feature-card {
      padding: 20px;
      background-color: #F5F5F5;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #00695C;
    }
    .feature-card p {
      font-size: 1rem;
      color: #666;
    }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .subtitle { font-size: 1.2rem; }
      .header { padding: 15px; }
      .logo { font-size: 1.5rem; }
      .auth-btn { padding: 8px 15px; }
      .cta-btn { padding: 12px 25px; }
    }
  `]
})
export class HomeComponent implements OnInit {
  userName: string = '';
  totalBalance$: Observable<number> = of(0);
  showAlert: boolean = true; // Toggleable for demo; can be dynamic based on backend data

  constructor(
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private bankingService: BankingService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.authService.isAuthenticated()) {
      this.loadUserInfo();
      this.loadTotalBalance();
    }
  }

  isAdmin(): boolean {
    const tokenPayload = this.authService.decodeToken();
    return tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
  }

  private loadUserInfo() {
    const tokenPayload = this.authService.decodeToken();
    if (tokenPayload) {
      this.userName = tokenPayload.sub || 'User';
    }
  }

  private loadTotalBalance() {
    this.totalBalance$ = this.bankingService.getUserAccounts().pipe(
      catchError(error => {
        console.error('Error fetching accounts:', error);
        return of([] as BankAccountDTO[]);
      }),
      map((accounts: BankAccountDTO[]): number => {
        return accounts.reduce((sum: number, acc: BankAccountDTO) => sum + (acc.balance || 0), 0);
      }) as OperatorFunction<BankAccountDTO[], number>
    );
  }
}

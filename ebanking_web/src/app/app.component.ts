import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div *ngIf="authService.isAuthenticated(); else notAuthenticated">
      <router-outlet></router-outlet>
    </div>
    <ng-template #notAuthenticated>
      <div class="login-message">
        <h2>Please Log In</h2>
        <p>You need to be authenticated to access this application.</p>
        <a routerLink="/login">Go to Login</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .login-message {
      text-align: center;
      margin-top: 50px;
    }
    .login-message h2 {
      color: #d32f2f;
    }
    .login-message a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}

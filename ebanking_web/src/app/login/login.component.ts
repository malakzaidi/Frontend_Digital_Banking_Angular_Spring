import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <h2>Sign In</h2>
      <form (ngSubmit)="login()">
        <div>
          <label>Username or Email</label>
          <input type="text" [(ngModel)]="loginData.usernameOrEmail" name="usernameOrEmail" required>
        </div>
        <div>
          <label>Password</label>
          <input type="password" [(ngModel)]="loginData.password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>Don’t have an account? <a routerLink="/register">Sign Up</a></p>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background-color: #0056b3; }
    .error { color: red; }
  `]
})
export class LoginComponent {
  loginData = { usernameOrEmail: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    console.log('Logging in with:', this.loginData);
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response && response.token) {
          console.log('Login successful, token:', response.token);
          localStorage.setItem('token', response.token);
          // Add token validation before redirecting
          const tokenPayload = this.authService.decodeToken();
          if (tokenPayload && tokenPayload.roles?.includes('ROLE_ADMIN')) {
            this.router.navigate(['/customers']);
          } else {
            this.errorMessage = 'You do not have admin access. Please log in with an admin account.';
            localStorage.removeItem('token'); // Clear invalid token
          }
        } else {
          this.errorMessage = 'Unexpected response format';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.errorMessage = err.error?.message || 'Login failed';
        if (err.error instanceof SyntaxError) {
          this.errorMessage = 'Server returned invalid response';
        }
      }
    });
  }
}

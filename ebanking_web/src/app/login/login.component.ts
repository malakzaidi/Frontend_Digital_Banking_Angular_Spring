import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card login-card">
        <h2>Sign In</h2>
        <form (ngSubmit)="login()">
          <div class="form-group">
            <label>Username or Email</label>
            <input type="text" [(ngModel)]="loginData.usernameOrEmail" name="usernameOrEmail" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="loginData.password" name="password" required>
          </div>
          <button type="submit">Login</button>
          <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
        <p class="signup-link">Don’t have an account? <a routerLink="/register">Sign Up</a></p>
      </div>
    </div>
  `,
  styles: [`
    .login-card {
      max-width: 400px;
      margin: 50px auto;
      text-align: center;
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 400;
    }
    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #333333;
      font-family: 'Roboto', sans-serif;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      font-family: 'Roboto', sans-serif;
    }
    input:focus {
      border-color: #00695C;
      outline: none;
    }
    button {
      width: 100%;
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
    }
    .error {
      color: #d32f2f;
      margin-top: 10px;
      font-family: 'Roboto', sans-serif;
    }
    .signup-link {
      margin-top: 20px;
      color: #666;
      font-family: 'Roboto', sans-serif;
    }
    .signup-link a {
      color: #FF6F61;
    }
    .signup-link a:hover {
      color: #E65A50;
    }
  `]
})
export class LoginComponent {
  loginData = { usernameOrEmail: '', password: '' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login() {
    this.errorMessage = '';
    console.log('Logging in with:', this.loginData);
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response && response.token) {
          console.log('Login successful, token:', response.token);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
          }
          const tokenPayload = this.authService.decodeToken();
          if (tokenPayload && tokenPayload.roles?.includes('ROLE_ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
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

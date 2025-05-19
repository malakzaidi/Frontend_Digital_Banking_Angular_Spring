import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Sign In</h2>
      <form (ngSubmit)="login()">
        <div>
          <label>Username or Email</label>
          <input type="text" [(ngModel)]="credentials.usernameOrEmail" name="usernameOrEmail" required>
        </div>
        <div>
          <label>Password</label>
          <input type="password" [(ngModel)]="credentials.password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>Don't have an account? <a routerLink="/register">Sign Up</a></p>
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
  credentials = { usernameOrEmail: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}

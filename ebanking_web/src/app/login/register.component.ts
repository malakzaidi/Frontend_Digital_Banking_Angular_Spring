import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Sign Up</h2>
      <form (ngSubmit)="register()">
        <div>
          <label>Username</label>
          <input type="text" [(ngModel)]="registerData.username" name="username" required>
        </div>
        <div>
          <label>Email</label>
          <input type="email" [(ngModel)]="registerData.email" name="email" required>
        </div>
        <div>
          <label>Password</label>
          <input type="password" [(ngModel)]="registerData.password" name="password" required>
        </div>
        <div>
          <label>First Name</label>
          <input type="text" [(ngModel)]="registerData.firstName" name="firstName" required>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" [(ngModel)]="registerData.lastName" name="lastName" required>
        </div>
        <div>
          <label>Role</label>
          <select [(ngModel)]="registerData.role" name="role" required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>Already have an account? <a routerLink="/login">Sign In</a></p>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input, select { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background-color: #0056b3; }
    .error { color: red; }
  `]
})
export class RegisterComponent {
  registerData = { username: '', email: '', password: '', firstName: '', lastName: '', role: 'USER' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { BankingService } from '../services/banking.service';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="login()">
        <mat-form-field appearance="outline">
          <mat-label>Username or Email</mat-label>
          <input matInput [(ngModel)]="form.usernameOrEmail" name="usernameOrEmail" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="form.password" name="password" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="!isFormValid()">Login</button>
        <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .error {
      color: red;
      margin-bottom: 10px;
    }
  `]
})
export class LoginComponent {
  form: LoginForm = {
    usernameOrEmail: '',
    password: ''
  };
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private bankingService: BankingService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return !!this.form.usernameOrEmail && !!this.form.password;
  }

  login(): void {
    if (!this.isFormValid()) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          const tokenPayload = this.authService.decodeToken();
          const isAdmin = tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
          const redirectPath = isAdmin ? '/dashboard' : '/my-accounts/new'; // Redirect to create account
          this.bankingService.showSuccess('Login successful!');
          this.router.navigate([redirectPath]);
        } else {
          this.error = 'No token received from server';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Login failed: ' + (err.error?.message || err.message || 'Unknown error');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}

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

interface RegisterForm {
  username: string;
  password: string;
  email: string;
  name: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Register</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="register()">
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="form.username" name="username" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="form.password" name="password" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="form.email" name="email" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="form.name" name="name" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="!isFormValid()">Register</button>
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
export class RegisterComponent {
  form: RegisterForm = {
    username: '',
    password: '',
    email: '',
    name: ''
  };
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private bankingService: BankingService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return !!this.form.username && !!this.form.password && !!this.form.email && !!this.form.name;
  }

  register(): void {
    if (!this.isFormValid()) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.authService.register(this.form).subscribe({
      next: (response: any) => {
        this.bankingService.showSuccess('Registration successful! Please log in.');
        this.router.navigate(['/login']); // Redirect to login after registration
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Registration failed: ' + (err.error?.message || err.message || 'Unknown error');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}

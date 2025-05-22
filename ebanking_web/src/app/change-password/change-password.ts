import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card change-password-card">
        <h2>Change Password</h2>
        <form (ngSubmit)="changePassword()">
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" [(ngModel)]="passwordData.currentPassword" name="currentPassword" required />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" [(ngModel)]="passwordData.newPassword" name="newPassword" required />
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <input type="password" [(ngModel)]="passwordData.confirmPassword" name="confirmPassword" required />
          </div>
          <button type="submit" [disabled]="isLoading">
            {{ isLoading ? 'Changing Password...' : 'Change Password' }}
          </button>
          <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .change-password-card { max-width: 400px; margin: 50px auto; text-align: center; }
    h2 { font-size: 2.2rem; font-weight: 400; }
    .form-group { margin-bottom: 20px; text-align: left; }
    label { display: block; margin-bottom: 5px; font-weight: 500; color: #333333; font-family: 'Roboto', sans-serif; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; transition: border-color 0.3s ease; font-family: 'Roboto', sans-serif; }
    input:focus { border-color: #00695C; outline: none; }
    button { width: 100%; font-size: 1rem; font-family: 'Roboto', sans-serif; }
    .error { color: #d32f2f; margin-top: 10px; font-family: 'Roboto', sans-serif; }
  `]
})
export class ChangePasswordComponent {
  passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  changePassword() {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'New passwords do not match';
      this.isLoading = false;
      return;
    }

    const token = isPlatformBrowser(this.platformId) ? this.authService.getToken() : null;

    if (!token) {
      this.errorMessage = 'No authentication token found. Please log in.';
      this.isLoading = false;
      return;
    }

    const payload = this.authService.decodeToken();

    if (!payload || this.authService.isTokenExpired(payload.exp)) {
      this.errorMessage = 'Session expired. Please log in again.';
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('token');
      }
      this.router.navigate(['/login']);
      this.isLoading = false;
      return;
    }

    const body = {
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    };

    this.authService.changePassword(body, token).subscribe({
      next: (response: any) => {
        this.errorMessage = 'Password changed successfully';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err: any) => {
        console.error('Change password error:', err);
        this.errorMessage =
          err.error?.message || 'Failed to change password. Please check your current password.';
        this.isLoading = false;
      }
    });
  }
}

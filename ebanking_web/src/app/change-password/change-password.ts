import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Change Password</h2>
      <form (ngSubmit)="changePassword()">
        <div>
          <label>Current Password</label>
          <input type="password" [(ngModel)]="passwordData.currentPassword" name="currentPassword" required>
        </div>
        <div>
          <label>New Password</label>
          <input type="password" [(ngModel)]="passwordData.newPassword" name="newPassword" required>
        </div>
        <button type="submit">Change Password</button>
        <p *ngIf="message" [ngClass]="{'success': !error, 'error': error}">{{ message }}</p>
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background-color: #0056b3; }
    .success { color: green; }
    .error { color: red; }
  `]
})
export class ChangePasswordComponent {
  passwordData = { currentPassword: '', newPassword: '' };
  message = '';
  error = false;

  constructor(private authService: AuthService) {}

  changePassword() {
    this.authService.changePassword(this.passwordData).subscribe({
      next: (res) => {
        this.message = res;
        this.error = false;
      },
      error: (err) => {
        this.message = err.error || 'Error changing password';
        this.error = true;
      }
    });
  }
}

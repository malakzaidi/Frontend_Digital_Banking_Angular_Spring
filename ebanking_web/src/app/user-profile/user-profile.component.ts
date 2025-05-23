import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { AuthService } from '../services/auth.service';
import { BankAccountDTO } from '../banking-dtos';

interface UserProfile {
  userId: string;
  username: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="profile-title">My Profile</h2>
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>{{ profile?.name || 'User' }}</mat-card-title>
          <mat-card-subtitle>User ID: {{ profile?.userId }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <!-- View Mode -->
          <div *ngIf="!isEditing" class="profile-details">
            <p><strong>Username:</strong> {{ profile?.username }}</p>
            <p><strong>Email:</strong> {{ profile?.email || 'N/A' }}</p>
            <p><strong>Phone:</strong> {{ profile?.phone || 'N/A' }}</p>
            <p><strong>Address:</strong> {{ profile?.address || 'N/A' }}</p>
            <p><strong>Account Created:</strong> {{ profile?.createdAt ? (profile.createdAt | date:'medium') : 'N/A' }}</p>
          </div>

          <!-- Edit Mode -->
          <form *ngIf="isEditing" (ngSubmit)="saveProfile()" class="edit-form">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Name</mat-label>
              <input matInput [(ngModel)]="profile.name" name="name" required>
            </mat-form-field>
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="profile.email" name="email" type="email" required>
            </mat-form-field>
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Phone</mat-label>
              <input matInput [(ngModel)]="profile.phone" name="phone">
            </mat-form-field>
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Address</mat-label>
              <input matInput [(ngModel)]="profile.address" name="address">
            </mat-form-field>
            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit">Save</button>
              <button mat-raised-button color="warn" type="button" (click)="cancelEdit()">Cancel</button>
            </div>
          </form>

          <!-- Accounts Section -->
          <h3 class="section-title">My Accounts</h3>
          <div class="accounts-list">
            <div *ngFor="let account of accounts" class="account-info">
              <p><strong>Account ID:</strong> {{ account.id }}</p>
              <p><strong>Type:</strong> {{ account.type }}</p>
              <p><strong>Balance:</strong> {{ account.balance | currency }}</p>
            </div>
            <div *ngIf="accounts.length === 0" class="no-accounts">
              No accounts found. Please create an account or contact support.
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions class="card-actions">
          <button *ngIf="!isEditing" mat-raised-button color="primary" (click)="toggleEdit()">Edit Profile</button>
          <button mat-raised-button color="accent" routerLink="/my-accounts">Back to Accounts</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 40px 20px;
      max-width: 800px;
      margin: 0 auto;
      background: #f5f7fa;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
    }
    .profile-title {
      font-size: 2.5rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
    }
    .profile-card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    mat-card-header {
      background: #34495e;
      padding: 20px;
    }
    mat-card-title {
      font-size: 1.8rem;
      color: #ffffff;
      font-weight: 500;
    }
    mat-card-subtitle {
      color: #ecf0f1;
      font-size: 1rem;
    }
    mat-card-content {
      padding: 30px;
    }
    .profile-details p {
      font-size: 1rem;
      color: #34495e;
      margin: 10px 0;
    }
    .profile-details strong {
      color: #2c3e50;
      font-weight: 500;
    }
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .form-field {
      width: 100%;
    }
    .form-field mat-label {
      color: #34495e;
    }
    .form-field input {
      font-size: 1rem;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .section-title {
      font-size: 1.5rem;
      color: #2c3e50;
      margin: 20px 0 10px;
    }
    .accounts-list {
      margin-top: 10px;
    }
    .account-info {
      padding: 15px;
      border-bottom: 1px solid #ecf0f1;
      background: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    .account-info p {
      margin: 5px 0;
      font-size: 0.95rem;
      color: #34495e;
    }
    .account-info strong {
      color: #2c3e50;
    }
    .no-accounts {
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
      padding: 15px;
    }
    .card-actions {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    button[mat-raised-button] {
      font-size: 0.95rem;
      padding: 8px 16px;
      border-radius: 6px;
    }
    button[color="primary"] {
      background: #3498db;
    }
    button[color="primary"]:hover {
      background: #2980b9;
    }
    button[color="accent"] {
      background: #e74c3c;
    }
    button[color="accent"]:hover {
      background: #c0392b;
    }
    button[color="warn"] {
      background: #7f8c8d;
    }
    button[color="warn"]:hover {
      background: #6c757d;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  accounts: BankAccountDTO[] = [];
  isEditing: boolean = false;
  originalProfile: UserProfile | null = null;

  constructor(
    private authService: AuthService,
    private bankingService: BankingService
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadAccounts();
  }

  loadProfile() {
    const tokenPayload = this.authService.decodeToken();
    if (tokenPayload) {
      this.profile = {
        userId: tokenPayload.sub || 'N/A',
        username: tokenPayload.username || 'N/A',
        email: tokenPayload.email || 'N/A',
        name: tokenPayload.name || 'N/A',
        phone: tokenPayload.phone || 'N/A',
        address: tokenPayload.address || 'N/A',
        createdAt: tokenPayload.createdAt || 'N/A'
      };
      this.originalProfile = { ...this.profile }; // Store original for cancel
    } else {
      this.bankingService.showError('Failed to load profile data');
    }

    // Optionally fetch from backend
    this.bankingService.getUserProfile().subscribe({
      next: (profile: UserProfile) => {
        this.profile = profile;
        this.originalProfile = { ...profile };
      },
      error: (err) => {
        console.warn('Failed to fetch profile from backend, using token data:', err);
      }
    });
  }

  loadAccounts() {
    const allAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    const userId = this.profile?.userId || '';
    this.accounts = allAccounts.filter((account: any) => account.userId === userId);
  }

  toggleEdit() {
    this.isEditing = true;
  }

  saveProfile() {
    if (!this.profile) return;

    this.bankingService.updateUserProfile(this.profile).subscribe({
      next: (updatedProfile: UserProfile) => {
        this.profile = updatedProfile;
        this.originalProfile = { ...updatedProfile };
        this.isEditing = false;
        this.bankingService.showSuccess('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
        this.bankingService.showError('Failed to update profile: ' + (err.message || 'Unknown error'));
        this.cancelEdit();
      }
    });

    // For now, simulate the update locally
    this.originalProfile = { ...this.profile };
    this.isEditing = false;
    this.bankingService.showSuccess('Profile updated successfully!');
  }

  cancelEdit() {
    if (this.originalProfile) {
      this.profile = { ...this.originalProfile };
    }
    this.isEditing = false;
  }
}

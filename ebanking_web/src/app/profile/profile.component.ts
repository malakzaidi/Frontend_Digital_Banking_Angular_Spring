import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile">
      <h2>My Profile</h2>
      <div class="profile-details">
        <p><strong>Username:</strong> {{ userName }}</p>
        <p><strong>Email:</strong> {{ userEmail }}</p>
        <p><strong>Role:</strong> {{ userRole }}</p>
      </div>
    </div>
  `,
  styles: [`
    .profile {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 400;
      text-align: center;
      color: #00695C;
    }
    .profile-details {
      margin-top: 20px;
    }
    .profile-details p {
      font-size: 1.1rem;
      margin: 10px 0;
      font-family: 'Roboto', sans-serif;
    }
    .profile-details strong {
      color: #333333;
      margin-right: 10px;
    }
  `]
})
export class ProfileComponent {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserInfo();
    }
  }

  private loadUserInfo() {
    const tokenPayload = this.authService.decodeToken();
    if (tokenPayload) {
      this.userName = tokenPayload.sub || 'N/A';
      this.userEmail = tokenPayload.email || 'N/A';
      this.userRole = tokenPayload.roles?.join(', ') || 'N/A';
    }
  }
}

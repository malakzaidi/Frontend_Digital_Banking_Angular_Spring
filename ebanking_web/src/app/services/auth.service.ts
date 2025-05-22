import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { usernameOrEmail: string, password: string }): Observable<any> {
    const body = {
      usernameOrEmail: credentials.usernameOrEmail, // Fixed: was 'username', should be 'usernameOrEmail'
      password: credentials.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Sending login request with body:', {
      usernameOrEmail: body.usernameOrEmail,
      password: '***'
    });

    return this.http.post(`${this.apiUrl}/auth/login`, body, { headers });
  }

  register(user: { username: string, email: string, password: string, firstName?: string, lastName?: string, roles?: string[] }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      roles: user.roles || ['USER'] // Default role
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/auth/register`, body, { headers });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/change-password`,
      { currentPassword, newPassword },
      { headers }
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired
    try {
      const payload = this.decodeToken();
      if (payload && payload.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return false;
    }

    return !!token;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) {
      console.warn('No token found');
      return null;
    }

    try {
      const payload = token.split('.')[1];
      if (!payload) {
        console.error('Invalid token format');
        return null;
      }

      const decoded = JSON.parse(atob(payload));
      console.log('Decoded token:', decoded);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Helper method to get user info from token
  getCurrentUser(): any {
    const payload = this.decodeToken();
    if (payload) {
      return {
        username: payload.sub,
        roles: payload.roles || [],
        exp: payload.exp
      };
    }
    return null;
  }
}

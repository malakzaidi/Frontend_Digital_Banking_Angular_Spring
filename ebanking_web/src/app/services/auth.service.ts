import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  login(credentials: { usernameOrEmail: string; password: string }): Observable<any> {
    const body = {
      usernameOrEmail: credentials.usernameOrEmail,
      password: credentials.password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/login`, body, { headers }).pipe(
      tap((response: any) => {
        // Store the token when login is successful
        if (response && response.token) {
          console.log('Login successful, storing token');
          this.setToken(response.token);
        } else {
          console.error('Login response missing token:', response);
        }
      })
    );
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
  }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      roles: user.roles || ['USER']
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/register`, body, { headers });
  }

  changePassword(data: { currentPassword: string; newPassword: string }, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/auth/change-password`, data, { headers });
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage');
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      console.log('Token removed from localStorage');
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log('Retrieved token from localStorage:', token ? 'Token exists' : 'No token found');
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log('No token available for authentication check');
      return false;
    }

    try {
      const payload = this.decodeToken();
      if (!payload || !payload.exp) {
        console.log('Invalid token payload');
        return false;
      }

      const isValid = payload.exp > Math.floor(Date.now() / 1000);
      console.log('Token authentication check:', isValid ? 'Valid' : 'Expired');
      return isValid;
    } catch (error) {
      console.error('Error checking token authentication:', error);
      return false;
    }
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded token payload:', payload);
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getCurrentUser(): any {
    const payload = this.decodeToken();
    return payload ? { username: payload.sub, roles: payload.roles || [], exp: payload.exp } : null;
  }

  isTokenExpired(exp: number): boolean {
    return Date.now() >= exp * 1000;
  }

  // Debug method to check current auth state
  debugAuthState(): void {
    console.log('=== Auth Debug Info ===');
    console.log('Token exists:', !!this.getToken());
    console.log('Is authenticated:', this.isAuthenticated());
    console.log('Current user:', this.getCurrentUser());
    console.log('======================');
  }
}

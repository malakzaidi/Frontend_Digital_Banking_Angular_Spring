import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
      <a routerLink="/login">Back to Login</a>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; text-align: center; }
  `]
})
export class UnauthorizedComponent {}

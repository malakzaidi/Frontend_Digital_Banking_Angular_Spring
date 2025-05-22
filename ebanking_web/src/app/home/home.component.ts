import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Welcome to Digital Banking</h1>
      <div class="buttons">
        <button routerLink="/login" class="btn">Sign In</button>
        <button routerLink="/register" class="btn">Sign Up</button>
      </div>
    </div>
  `,
  styles: [`
    .container { text-align: center; margin-top: 50px; }
    .buttons { margin-top: 20px; }
    .btn { padding: 10px 20px; margin: 0 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
    .btn:hover { background-color: #0056b3; }
  `]
})
export class HomeComponent {}


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar color="primary">
      <span>E-Banking</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/customers">Customers</button>
      <button mat-button routerLink="/accounts">Accounts</button>
      <button mat-button routerLink="/transactions">Transactions</button>
      <button mat-button routerLink="/transfer">Transfer</button>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    mat-toolbar { margin-bottom: 20px; }
  `]
})
export class AppComponent {}

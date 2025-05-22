import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Chart, registerables} from 'chart.js';
import {jwtInterceptor} from './app/services/jwt.interceptor';


Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // ✅ Apply interceptor using withInterceptors
    provideHttpClient(withInterceptors([jwtInterceptor])),
    importProvidersFrom(MatSnackBarModule, BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));

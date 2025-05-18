import { bootstrapApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/animations';
import { provideServerRendering } from '@angular/platform-server';

export default async function bootstrap() {
  const app = await bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      provideRouter(routes),
      provideHttpClient(),
      importProvidersFrom(MatSnackBarModule, NoopAnimationsModule)
    ]
  });
  return app;
}

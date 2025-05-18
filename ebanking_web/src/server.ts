import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/animations';
import { provideServerRendering } from '@angular/platform-server';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export default async function (url: string) {
  return renderApplication(() => bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      provideRouter(routes),
      provideHttpClient(),
      importProvidersFrom(MatSnackBarModule, NoopAnimationsModule)
    ]
  }), {
    url,
    document: '<app-root></app-root>'
  });
}

import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './app/app.module.server';

export default async function bootstrap() {
  return renderModule(AppServerModule, {
    document: '<app-root></app-root>',
    url: '/'
  });
}

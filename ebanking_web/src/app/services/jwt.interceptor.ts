import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const skipUrls = ['/api/auth/login', '/api/auth/register'];
  const shouldSkip = skipUrls.some(url => req.url.includes(url));

  if (shouldSkip) {
    console.log(`Skipping JWT interceptor for ${req.url}`);
    return next(req);
  }

  const token = authService.getToken();
  if (token) {
    console.log(`Adding token to request for ${req.url}`);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log(`No token available for ${req.url}`);
  }
  return next(req);
};

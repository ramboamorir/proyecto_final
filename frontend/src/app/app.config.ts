import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = localStorage.getItem('token');

          if (token) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
          }

          return next(req);
        },
      ]),
    ),
  ],
};

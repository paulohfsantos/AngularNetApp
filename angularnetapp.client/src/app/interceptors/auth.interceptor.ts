import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// not using this yet
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookieService);
  const token = cookies.get('accessToken');

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(authReq);
  }

  return next(req);

  // const token = inject(CookieService).get('accessToken');
  // const headers = req.headers.set('Authorization', `Bearer ${token}`);
  // const authReq = req.clone({ headers });
  // return next(authReq)
};

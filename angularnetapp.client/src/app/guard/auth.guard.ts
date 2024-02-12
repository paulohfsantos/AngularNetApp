import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

// const http = new HttpClient();
// const authService = new AuthService();

export const canActivate = (route: any, state: any) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // return authService.checkLogin().pipe(
  //   map(() => true),
  //   catchError(() => {
  //     return router.createUrlTree(['route-to-fallback-page']);
  //   })
  // );
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const canActivate: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticatedUser()) {
    return true;
  } else {
    return false;
  }
};

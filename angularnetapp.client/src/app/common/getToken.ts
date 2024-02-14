import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationHandler {
  private cookies = inject(CookieService);
  constructor() { }

  getAccessToken() {
    return this.cookies.get('accessToken');
  }
  setToken(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  isAuthenticated() {
    return this.cookies.check('accessToken');
  }

  logout() {
    this.cookies.delete('accessToken');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ILoginRequest } from '../../DTOs/login-request';
import { IRegisterRequest } from '../../DTOs/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookies: CookieService,
    private http: HttpClient
  ) {}

  login(credentials: ILoginRequest) {
    return this.http.post('/login', credentials, { withCredentials: true });

    // response.subscribe((observer) => {
    //   console.log('observer', observer);
    //   this.cookies.set('user-detail', `username=${credentials.email};`, 1, '/');
    // });
  }

  register(credentials: IRegisterRequest) {
    return this.http.post('/register', credentials, { withCredentials: true });
  }

  checkLogin() {
    // return this.http.get('/check-login');
  }

  isAuthenticated() {
    // later
  }
}

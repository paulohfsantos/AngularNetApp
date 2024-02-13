import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ILoginRequest } from '../../DTOs/login-request';
import { IRegisterRequest } from '../../DTOs/register-request';
import { ILoginResponse } from '../../DTOs/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  constructor() {
    this.isAuthenticated = this.cookies.check('accessToken');
  }

  login(credentials: ILoginRequest) {
    this.http.post<ILoginResponse>('api/login', credentials)
      .subscribe((data) => {
        console.log('dt', data);
        const accessToken = data.accessToken;
        this.cookies.set('accessToken', accessToken);
        this.isAuthenticated = true;
      });

    // if (this.isAuthenticated) {
    //   notify('You have successfully logged in', 'success', 1000);
    // }

    // return this.isAuthenticated;
  }

  register(credentials: IRegisterRequest) {
    this.http.post('/register', credentials);
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}

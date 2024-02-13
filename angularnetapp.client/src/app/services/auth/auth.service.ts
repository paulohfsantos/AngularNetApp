import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ILoginRequest } from '../../DTOs/login-request';
import { IRegisterRequest } from '../../DTOs/register-request';
import { ILoginResponse } from '../../DTOs/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
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

        this.router.navigate(['/home']);
      });
  }

  register(credentials: IRegisterRequest) {
    this.http.post('/register', credentials);
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}

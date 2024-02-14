import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ILoginRequest } from '../../DTOs/login-request';
import { IRegisterRequest } from '../../DTOs/register-request';
import { ILoginResponse } from '../../DTOs/login-response';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  isAuthenticated = false;
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  private isAuthenticatedSubject = new BehaviorSubject(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // this.isAuthenticated = this.cookies.check('accessToken');
    this.isAuthenticatedSubject.next(this.isAuthenticatedUser());
  }

  login(credentials: ILoginRequest) {
    this.http.post<ILoginResponse>('api/login', credentials)
      .subscribe((data) => {
        const accessToken = data.accessToken;
        const expirationTime = Date.now() + data.expiresIn * 1000;
        this.cookies.set('accessToken', accessToken);
        this.cookies.set('refreshToken', data.refreshToken);
        this.cookies.set('tokenExpiration', expirationTime.toString());
        this.isAuthenticatedSubject.next(true);

        this.isAuthenticated = true;

        this.router.navigate(['/home']);
      });
  }

  register(credentials: IRegisterRequest) {
    this.http.post('/register', credentials);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ILoginResponse>('api/refresh', {
      refreshToken,
    });
  }

  isAuthenticatedUser() {
    // return this.isAuthenticated;

    const accessToken = this.cookies.get('accessToken');
    const expirationTime = this.cookies.get('tokenExpiration');
    if (accessToken && expirationTime) {
      const now = Date.now();
      return now < parseInt(expirationTime, 10);
    }
    return false;
  }

  expirationCheck(expiresIn: number) {
    console.log('Checking token expiration');
    const expirationTime = this.cookies.get('tokenExpiration');
    if (expirationTime) {
      const now = Date.now();
      if (now > parseInt(expirationTime, 10)) {
        this.tokenExpired();
        console.log('Token has expired');
      } else {
        console.log('Token is still valid');
      }
    }
  }

  tokenExpired() {
    this.cookies.delete('accessToken');
    this.cookies.delete('refreshToken');
    this.cookies.delete('tokenExpiration');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}

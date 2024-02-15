import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  isLoggedIn() {
    return this.authService.isAuthenticatedUser();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    notify(
      'You have been logged out.',
      'success',
      2000
    );
  }

  title = 'angularnetapp.client';
}

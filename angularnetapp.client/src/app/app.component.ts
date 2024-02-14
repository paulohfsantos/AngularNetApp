import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  ngOnInit() {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    console.log('Logout');
  }

  helloWorld() {
    console.log('Hello World!');
  }

  title = 'angularnetapp.client';
}

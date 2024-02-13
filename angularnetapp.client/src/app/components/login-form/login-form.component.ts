import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ILoginRequest } from '../../DTOs/login-request';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  router = inject(Router);

  loginFormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required]
    )
  });

  constructor(private authService: AuthService) { }

  handleSubmit() {
    if (this.loginFormGroup.invalid) {
      return;
    }

    const credentials = this.loginFormGroup.value;
    this.authService.login(credentials as ILoginRequest);
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/home']);
    }
  }
}

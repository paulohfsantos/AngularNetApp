import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ILoginRequest } from '../../DTOs/login-request';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
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

    console.log('caiu aqui disgrasssa');
    const credentials = this.loginFormGroup.value;

    this.authService.login(credentials as ILoginRequest);
  }
}

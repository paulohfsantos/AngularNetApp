import { Component } from '@angular/core';
import { ILoginRequest } from '../../DTOs/login-request';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formData: ILoginRequest = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService) { }

  submitForm() {
    const { email, password } = this.formData;

    this.authService.login({ email, password })
      .subscribe({
        next: this.onNextFn.bind(this),
        error: this.onErrorFn.bind(this)
      });
  }

  onNextFn(data: Object) {
    console.log(data);
  }

  onErrorFn(err: Error | string) {
    console.log(err);
  }
}

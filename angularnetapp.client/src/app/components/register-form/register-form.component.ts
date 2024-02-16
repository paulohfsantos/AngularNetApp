import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterRequest } from '../../DTOs/register-request';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  router = inject(Router);
  authService = inject(AuthService);

  registerFormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required]
    )
  });

  constructor() { }

  handleSubmit() {
    if (this.registerFormGroup.invalid) {
      return;
    }

    const credentials = this.registerFormGroup.value;
    this.authService.register(credentials as IRegisterRequest)
      .subscribe(() => {
        notify('User registered successfully', 'success');
        this.router.navigate(['/login']);
      });
  }
}

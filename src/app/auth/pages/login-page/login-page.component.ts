import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Login } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public myForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  onLogin() {
    this.isLoading = true;
    if (this.myForm.invalid) {
      this.sharedService.showSnackbar("Por favor ingrese sus credenciales", "Error");
      return;
    }


    const request: Login = {
      username: this.myForm.value.username,
      password: this.myForm.value.password
    }

    this.authService.login(request.username, request.password).subscribe({
      next: (resp) => {
        this.router.navigate(['/centro']);
        this.sharedService.showSnackbar("Sesión inciada", "Bienvenido");
        this.isLoading = false;
      },
      error: (e) => {
        this.sharedService.showSnackbar("Credenciales incorrectas", "Error");
        this.isLoading = false;
        this.myForm.reset({
          username: '',
          password: ''
        })
      }
    })

  }

}

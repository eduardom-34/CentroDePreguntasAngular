import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/register.interface';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {

    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onRegister() {
    if (this.myForm.invalid) {
      this.sharedService.showSnackbar("Por favor ingrese sus credenciales", "Error");
      return;
    }

    const register: Register = {
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      userName: this.myForm.value.userName,
      password: this.myForm.value.password,
    }

    this.authService.register(register.firstName, register.lastName, register.userName, register.password)
    .subscribe({
      next: (resp) => {
        this.router.navigate(['/centro']);
        this.sharedService.showSnackbar("Cuenta creada", "Bienvenido");
      }
    })
  }

}

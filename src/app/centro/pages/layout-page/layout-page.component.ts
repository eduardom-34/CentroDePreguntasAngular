import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ){}


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.sharedService.showSnackbar("Haz cerrado sesion", "Adiós")
  }

}

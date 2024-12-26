import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Sesion } from '../../../auth/interfaces/sesion.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit{

  public user?: User;
  public sesion!: Sesion;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService
  ){}

  ngOnInit(): void {


    const currentUser = this.authService.currentUser;

    currentUser === undefined ? null : this.sesion = currentUser;

    this.userService.getByUserName(this.sesion.userName)
    .subscribe( user => this.user = user )

  }

  getName() {
    if( this.user === undefined) return ""
    if( this.user.userName === undefined) return " "

    return this.user.userName;
  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.sharedService.showSnackbar("Haz cerrado sesion", "Adiós")
  }

}

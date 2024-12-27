import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor( private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      // tap( isAuthenticated => console.log('Authenticated:', isAuthenticated) ),
      tap( isAuthenticated => {
        if( !isAuthenticated ) {
          this.router.navigate(['auth/login']);
          this.sharedService.showSnackbar("La sesión ha caducado", "Error");
        }
      }),
    )

  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {

    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {


    return this.checkAuthStatus();
  }

}

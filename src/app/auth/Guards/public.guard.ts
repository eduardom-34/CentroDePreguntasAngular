import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

    constructor( private authService: AuthService,
      private router: Router
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean> {

      return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if( isAuthenticated ) {
            this.router.navigate(['/']);
          }
        }),
        map( isAuthenticated => !isAuthenticated)
      )

    }

    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {

      return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {


      return this.checkAuthStatus();
    }


}

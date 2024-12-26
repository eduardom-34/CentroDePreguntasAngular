import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Sesion } from '../interfaces/sesion.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../centro/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: Sesion;

  constructor(private http: HttpClient) { }

  get currentUser(): Sesion | undefined {
    if( !this.user ) return undefined;
    return structuredClone(this.user);
  }

  login( username: string, password: string ):Observable<Sesion> {

    return this.http.post<Sesion>(`${ this.baseUrl }/user/login`, {username, password})
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', user.token))
      );
  }

  checkAuthentication(): Observable<boolean>{
    if( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<Sesion>(`${this.baseUrl}/user/4`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError(err => of(false))
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}

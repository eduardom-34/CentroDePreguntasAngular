import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { Sesion } from '../interfaces/sesion.interface';

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

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}

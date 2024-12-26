import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { UserToken } from '../interfaces/user-token.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getByUserName(username: string): Observable<User>{
      return this.http.get<User>(`${this.baseUrl}/${username}`)
    }

    getUserByToken(token: string): Observable<UserToken>{
      return this.http.post<UserToken>(`${this.baseUrl}/validate-token`, {token})
    }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

}

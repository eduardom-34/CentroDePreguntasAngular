import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../interfaces/answers.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.baseUrl}/answer`)
  }
}

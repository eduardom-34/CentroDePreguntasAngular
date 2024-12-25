import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl: string = environments.baseUrl;

  constructor(private Http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.Http.get<Question[]>(`${this.baseUrl}/question`)
  }
}

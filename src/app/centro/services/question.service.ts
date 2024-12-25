import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question.interface';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/question`)
  }

  postQuestion(content: string, userId: number): Observable<number>{
    return this.http.post<number>(`${this.baseUrl}/question`, {content, userId})
  }
}

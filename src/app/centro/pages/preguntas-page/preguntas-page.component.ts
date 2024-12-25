import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-preguntas-page',
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.css'
})
export class PreguntasPageComponent implements OnInit {

  public questions : Question[] = [];

  constructor( private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe( questions => this.questions = questions )
  }

}

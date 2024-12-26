import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { QuestionService } from '../../services/question.service';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { NewQuestion } from '../../interfaces/new-question.interface';
import { Answer } from '../../interfaces/answers.interface';
import { AnswerService } from '../../services/answer.service';
import { NewAnswer } from '../../interfaces/new-answer.interface';

@Component({
  selector: 'app-preguntas-page',
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.css'
})
export class PreguntasPageComponent implements OnInit {

  public questions : Question[] = [];
  public answers: Answer[] = [];
  public user?: User;
  public myForm: FormGroup;
  public myAnswerForm: FormGroup;

  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private fb: FormBuilder



  ) {

    this.myForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.myAnswerForm = this.fb.group({
      answer: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe( questions => this.questions = questions )
    this.answerService.getAnswers()
      .subscribe( answers => this.answers = answers )
  }

  onPostQuestion(): void{
    if (this.myForm.invalid) {
      this.sharedService.showSnackbar("Por favor, escribe una pregunta", "Error");
      return;
    }

    const newQuestion: NewQuestion = {
      content: this.myForm.value.question,
      userId: 4
    }

    this.questionService.postQuestion(newQuestion.content, newQuestion.userId).subscribe({
      next: (resp) => {
        this.sharedService.showSnackbar("La pregunta se ha realizado", "Muy bien");
        this.myForm.reset({
          question: ''
        });
      },
      error: (e) => {
        this.sharedService.showSnackbar("No se ha podido hacer la pregunta, intente otra vez", "Error");
      }
    })
  }

  onPostAnswer(): void{
    if (this.myAnswerForm.invalid) {
      this.sharedService.showSnackbar("Por favor, escribe una respuesta", "Error");
      return;
    }

    const newAnswer: NewAnswer = {
      content: this.myAnswerForm.value.answer,
      userId: 4,
      questionId: 21
    }

    this.answerService.postAnswers(newAnswer.content, newAnswer.userId, newAnswer.questionId).subscribe({
      next: (resp) => {
        this.sharedService.showSnackbar("La respuesta se ha realizado", "Muy bien");
        this.myAnswerForm.reset({
          answer: ''
        });
      },
      error: (e) => {
        this.sharedService.showSnackbar("No se ha podido hacer la respuesta, intente otra vez", "Error");
      }
    })

  }

}

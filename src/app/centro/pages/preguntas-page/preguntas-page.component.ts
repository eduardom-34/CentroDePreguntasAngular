import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { NewQuestion } from '../../interfaces/new-question.interface';
import { Answer } from '../../interfaces/answers.interface';
import { AnswerService } from '../../services/answer.service';
import { NewAnswer } from '../../interfaces/new-answer.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { Sesion } from '../../../auth/interfaces/sesion.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-preguntas-page',
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.css'
})
export class PreguntasPageComponent implements OnInit {

  public questions : Question[] = [];
  public answers: Answer[] = [];
  public myForm: FormGroup;
  public myAnswerForm: FormGroup;
  public token: string = '';
  public user!: User;
  public sesion!: Sesion;


  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
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

    const currentUser = this.authService.currentUser;

    currentUser === undefined ? null : this.sesion = currentUser;

    this.userService.getByUserName(this.sesion.userName)
    .subscribe( user => this.user = user )

  }


  onPostQuestion(): void{
    if (this.myForm.invalid) {
      this.sharedService.showSnackbar("Por favor, escribe una pregunta", "Error");
      return;
    }

    const content: string = this.myForm.get('question')?.value;

    this.questionService.postQuestion(content, this.user.userId).subscribe({
      next: (resp) => {
        this.sharedService.showSnackbar("La pregunta se ha realizado", "Muy bien");
        this.myForm.reset({
          question: ''
        });
      },
      error: (e) => {
        this.sharedService.showSnackbar("No se ha podido hacer la pregunta, intente otra vez", "Error");
      }
    });
  }

  onPostAnswer(questionId: number): void{
    if (this.myAnswerForm.invalid) {
      this.sharedService.showSnackbar("Por favor, escribe una respuesta", "Error");
      return;
    }

    const content: string = this.myAnswerForm.get('answer')?.value;

    this.answerService.postAnswers(content, this.user.userId, questionId).subscribe({
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

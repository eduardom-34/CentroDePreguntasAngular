import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { QuestionService } from '../../services/question.service';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { NewQuestion } from '../../interfaces/new-question.interface';

@Component({
  selector: 'app-preguntas-page',
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.css'
})
export class PreguntasPageComponent implements OnInit {

  public questions : Question[] = [];
  public user?: User;
  public myForm: FormGroup;

  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService,
    private fb: FormBuilder



  ) {
    this.myForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe( questions => this.questions = questions )
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

}

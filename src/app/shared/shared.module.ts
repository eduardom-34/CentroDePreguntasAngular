import { NgModule } from '@angular/core';
import { Error4040PageComponent } from './pages/error4040-page/error4040-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    Error4040PageComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    Error4040PageComponent,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }

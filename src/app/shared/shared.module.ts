import { NgModule } from '@angular/core';
import { Error4040PageComponent } from './pages/error4040-page/error4040-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Error4040PageComponent
  ],
  exports: [
    Error4040PageComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

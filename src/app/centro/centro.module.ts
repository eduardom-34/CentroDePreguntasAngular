import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroRoutingModule } from './centro-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CentroPageComponent } from './pages/centro-page/centro-page.component';
import { PreguntasPageComponent } from './pages/preguntas-page/preguntas-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    CentroPageComponent,
    PreguntasPageComponent
  ],
  imports: [
    CommonModule,
    CentroRoutingModule
  ]
})
export class CentroModule { }

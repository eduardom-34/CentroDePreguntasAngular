import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroRoutingModule } from './centro-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PreguntasPageComponent } from './pages/preguntas-page/preguntas-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PreguntasPageComponent
  ],
  imports: [
    CommonModule,
    CentroRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class CentroModule { }

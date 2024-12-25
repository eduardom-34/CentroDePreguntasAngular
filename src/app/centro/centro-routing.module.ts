import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

// localhost:4200/centro, esta es la ruta
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    // children: [
    //   {
    //     path:
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroRoutingModule { }

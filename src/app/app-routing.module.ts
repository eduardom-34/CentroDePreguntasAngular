import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error4040PageComponent } from './shared/pages/error4040-page/error4040-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule ),
  },
  {
    path: 'centro',
    loadChildren: () => import('./centro/centro.module').then(m => m.CentroModule ),
  },
  {
    path: '404',
    component: Error4040PageComponent
  },
  {
    path: '',
    redirectTo: 'centro',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

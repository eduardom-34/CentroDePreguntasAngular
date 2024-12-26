import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { Error4040PageComponent } from './shared/pages/error4040-page/error4040-page.component';
import { AuthGuard } from './auth/Guards/auth.guard';
import { PublicGuard } from './auth/Guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule ),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  {
    path: 'centro',
    loadChildren: () => import('./centro/centro.module').then(m => m.CentroModule ),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
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

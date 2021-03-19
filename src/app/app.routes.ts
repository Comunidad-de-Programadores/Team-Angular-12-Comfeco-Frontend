import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliticsRoutingModule } from './politicas/politics.routes';
import { AuthRoutingModule } from './auth/auth.routes';
import { PagesRoutingModule } from './pages/pages.routes';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'client/inicio', pathMatch: 'full' },
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PoliticsRoutingModule,
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PoliticsRoutingModule } from './politicas/politics.routes';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    // { path: 'recuperar', component: -},
    // { path: 'registro', component: -},
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      PoliticsRoutingModule
    ],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
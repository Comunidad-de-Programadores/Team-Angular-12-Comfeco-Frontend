import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PoliticsRoutingModule } from './politicas/politics.routes';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'recuperar', component: ForgotComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'cambiar-contraseña', component: RecoverPasswordComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      PoliticsRoutingModule
    ],
    exports: [RouterModule]
  })
export class AppRoutingModule { }

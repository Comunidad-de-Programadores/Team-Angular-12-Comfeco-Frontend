import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent},
            { path: 'recuperar', component: ForgotComponent},
            { path: 'registro', component: RegisterComponent},
            { path: 'cambiar-contraseña', component: RecoverPasswordComponent },
        ]
      }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AuthRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PoliticsRoutingModule } from './politicas/politics.routes';
import { AuthRoutingModule } from './auth/auth.routes';
import { PagesRoutingModule } from './pages/pages.routes';

export const routes: Routes = [


    { path: '', redirectTo: 'auth', pathMatch: 'full'},
    { path: '**', component: LoginComponent, pathMatch: 'full'}
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

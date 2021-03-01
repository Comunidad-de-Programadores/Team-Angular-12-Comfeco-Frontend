import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'client',
  component: PagesComponent,
  children: [
    { path: 'inicio', component: HomeComponent },
    { path: 'perfil', component: ProfileComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

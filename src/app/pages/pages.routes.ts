import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [ {
    path: 'client',
    component: PagesComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'inicio', component: HomeComponent},
      {path: '', redirectTo: 'client', pathMatch: 'full'}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { HomeComponent } from './home/home.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { HasUnsavedChangesGuard } from '../guards/has-unsaved-changes.guard';

const routes: Routes = [{
  path: 'client',
  component: PagesComponent,
  children: [
    { path: 'inicio/:id', component: HomeComponent },
    { path: 'perfil', component: MainProfileComponent, canActivate: [AuthenticationGuard] },
    { path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [AuthenticationGuard], canDeactivate: [HasUnsavedChangesGuard] },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }

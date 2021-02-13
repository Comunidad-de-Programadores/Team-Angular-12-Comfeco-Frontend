import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminosComponent } from './terminos/terminos.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { PoliticsComponent } from './politics.component';

export const routes: Routes = [
    {
        path: 'politics',
        component: PoliticsComponent,
        children: [
          { path: 'politicas', component: PoliticasComponent },
          { path: 'terminos', component: TerminosComponent },
          { path: '', pathMatch: 'full', redirectTo: 'politics' }
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
export class PoliticsRoutingModule { }
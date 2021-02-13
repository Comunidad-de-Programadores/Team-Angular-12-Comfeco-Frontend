import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticasComponent } from './politicas/politicas.component';
import { TerminosComponent } from './terminos/terminos.component';
import { PoliticsComponent } from './politics.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PoliticasComponent, TerminosComponent, PoliticsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PoliticsComponent,
    TerminosComponent
  ]
})
export class PoliticasModule { }

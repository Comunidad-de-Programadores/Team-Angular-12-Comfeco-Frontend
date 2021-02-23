import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesComponent } from './comunidades/comunidades.component';



@NgModule({
  declarations: [ComunidadesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ComunidadesComponent
  ]
})
export class ComponentsModule { }

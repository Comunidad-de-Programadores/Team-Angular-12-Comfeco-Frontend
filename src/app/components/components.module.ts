import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { SlidersComponent } from './sliders/sliders.component';



@NgModule({
  declarations: [ComunidadesComponent, SlidersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ComunidadesComponent,
    SlidersComponent
  ]
})
export class ComponentsModule { }

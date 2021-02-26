import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { SlidersComponent } from './sliders/sliders.component';
import { SharedModule } from '../shared/shared.module';
import { TimerComponent } from './timer/timer.component';



@NgModule({
  declarations: [ComunidadesComponent, SlidersComponent, TimerComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ComunidadesComponent,
    SlidersComponent,
    TimerComponent
  ]
})
export class ComponentsModule { }

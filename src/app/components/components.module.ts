import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { SharedModule } from '../shared/shared.module';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [ComunidadesComponent, TimerComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ComunidadesComponent,
    TimerComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { SlidersComponent } from './sliders/sliders.component';
import { CommunityService } from '../services/community.service';



@NgModule({
  declarations: [ComunidadesComponent, SlidersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ComunidadesComponent,
    SlidersComponent
  ],
  providers: [CommunityService] // <-- Load service CommunityService
})
export class ComponentsModule { }

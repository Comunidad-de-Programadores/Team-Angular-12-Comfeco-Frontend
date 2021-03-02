import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProfileComponent } from './profile/profile.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';


@NgModule({
  declarations: [PagesComponent, HomeComponent, ProfileComponent, EditarPerfilComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    NgxUsefulSwiperModule
  ]
})
export class PagesModule { }

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
import { BadgesComponent } from './badges/badges.component';
import { GroupsComponent } from './groups/groups.component';
import { EventsComponent } from './events/events.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserServiceService } from './editar-perfil/edit-user-service.service';


@NgModule({
  declarations: [PagesComponent, HomeComponent, ProfileComponent, EditarPerfilComponent, BadgesComponent, GroupsComponent, EventsComponent, MainProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule
  ],
  exports: [EditarPerfilComponent],
  providers: [EditUserServiceService]

})
export class PagesModule { }

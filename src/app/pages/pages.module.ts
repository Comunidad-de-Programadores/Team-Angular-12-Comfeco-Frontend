import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }

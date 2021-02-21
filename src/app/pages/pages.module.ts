import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }

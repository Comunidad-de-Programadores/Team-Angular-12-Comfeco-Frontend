import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  listMedals = [
    { name: 'Camper', img: 'assets/img/medals/medal.svg' },
    { name: 'Lector', img: 'assets/img/medals/medal-2.svg' },
    { name: 'Primer emoji', img: 'assets/img/medals/medal-3.svg' },
    { name: 'Preguntas frecuentes leídas', img: 'assets/img/medals/medal-4.svg' },
    { name: 'Primer enlace', img: 'assets/img/medals/medal-5.svg' },
    { name: 'Primer me gusta', img: 'assets/img/medals/medal-6.svg' },
    { name: 'Primera vez que comparte', img: 'assets/img/medals/medal-7.svg' },
    { name: '¡Bienvenido/a!', img: 'assets/img/medals/medal-8.svg' },
    { name: 'Buena contribución', img: 'assets/img/medals/medal-9.svg' }
  ];

  config: SwiperOptions = {
    slidesPerView: 4,
    autoplay: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1280: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      425: {
        slidesPerView: 2
      },
      375: {
        slidesPerView: 1
      }
    }
  };

  constructor() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

}

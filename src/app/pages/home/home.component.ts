import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { CreatorsService } from '../../services/creators.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    spaceBetween: 10,
    loopedSlides: 1,
    autoplay: {
      delay: 2000
    },
    slidesPerView: 1,
    breakpoints: {
      1440: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      425: {
        slidesPerView: 2
      }
    }
  };
  config2: SwiperOptions = {
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    spaceBetween: 10,
    slidesPerView: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 4
      },
      425: {
        slidesPerView: 2
      }
    }
  };
  listSponsors = [
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-huawei.webp',
      name: 'Huawei'
    },
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-fernando_herrera.webp',
      name: 'Fernando Herrera'
    },
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-stacklycode.webp',
      name: 'Stackly Code'
    },
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-jose_dimas_lujan.webp',
      name: 'José Dimas Luján'
    },
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-dominicode.webp',
      name: 'Domini Code'
    },
    {
      img: 'https://www.comfeco.com/images/sponsors/sponsor-codelytv.webp',
      name: 'CodelyTV'
    },
  ]
  listCreators = [];
  constructor(
    private creatorService: CreatorsService
  ) { }

  ngOnInit(): void {
    this.getCreators();
  }

  async getCreators() {
    const resp: any = await this.creatorService.loadCreators().toPromise();
    //console.log(resp);
    this.listCreators = resp.listCreator;
  }

}

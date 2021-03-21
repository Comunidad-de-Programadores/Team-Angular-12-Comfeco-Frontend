import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { SwiperOptions } from 'swiper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  preg: boolean;
  subscription: Subscription;
  loading = false;
  userEvents = [];
  userData: any = {};
  socialNetworks;
  badgesUser = [];

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    slidesPerView: 4,
    autoplay: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

  constructor(private userService: UserService,
              private eventsService: EventsService,
              private toastr: ToastrService) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userService.getUserSubject().subscribe();
    this.setSocialNetworks();
    this.getBadges();
    this.getUserEvents();
  }

  setSocialNetworks() {
    var socialNetworks = [];
    const temp = this.userData.socialNetwork;

    temp?.forEach((element: string) => {
      if (element != null) {
        switch (element.substr(0, 2)) {
          case 'fa':
            const facebook = {
              icon: 'fab fa-facebook',
              link: `https://www.${element}`
            }
            socialNetworks.push(facebook);
            break;
          case 'li':
            const linkedin = {
              icon: 'fab fa-linkedin',
              link: `https://www.${element}`
            }
            socialNetworks.push(linkedin);
            break;
          case 'tw':
            const twitter = {
              icon: 'fab fa-twitter',
              link: `https://www.${element}`
            }
            socialNetworks.push(twitter);
            break;
          case 'gi':
            const github = {
              icon: 'fab fa-github',
              link: `https://www.${element}`
            }
            socialNetworks.push(github);
            break;
        }
      }
    }


    );

    this.socialNetworks = socialNetworks;
  }

  async getBadges() {
    const resp: any = await this.userService.getBadges().toPromise();
    this.badgesUser = resp.misInsignias;
    if (this.badgesUser.length >= 1) {
      this.preg = true;
    }else{
      this.preg = false;
    }
    console.log(this.preg);
  }

  private async getUserEvents(){
    var res: any = await this.userService.getUser().toPromise();
    const uid = res.userFound._id;

    res = await (await this.eventsService.getUserEvents(uid)).toPromise();
    this.userEvents = res.listEvent;
    console.log(this.userEvents);

  }

  async clickLeave(eventId: string){
    this.loading = true;

    try{
      const res: any = await this.eventsService.leaveEvent(eventId).toPromise();

      if (res.ok) {
        this.loading = false;
        this.toastr.success(res.mensaje);
      } else {
        this.loading = false;
        this.toastr.error(res.mensaje);
      }
    }catch(error){
      this.loading = false;
      this.toastr.error(error.error.mensaje);
    }

    this.getUserEvents();
  }


}

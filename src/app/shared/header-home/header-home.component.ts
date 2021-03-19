import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit, OnDestroy {

  headerLinks = [
    {
      title: 'Inicio',
      routerLink: 'inicio',
      icon: 'fa fa-home',
    },
    {
      title: 'Comunidades',
      routerLink: '/client',
      icon: 'fa fa-users',
    },
    {
      title: 'Talleres',
      routerLink: '/client',
      icon: 'fa fa-briefcase',
    },
    {
      title: 'Creadores',
      routerLink: '/client',
      icon: 'fa fa-home',
    }
  ]

  userData: User;
  userGuest = false;
  subscription: Subscription;

  constructor(private router: Router,
    private userService: UserService) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.getInfoUser();
    this.subscription = this.userService.getUserSubject().subscribe(
      (res) => {
        this.userData.nick = res.nick;
        this.userData.img = res.img;
      }
    )
  }
  getInfoUser() {
    this.userData = JSON.parse(localStorage.getItem('user'));

    if (!this.userData) {
      this.userGuest = true;
      this.userData = {
        nick: 'Guest',
        img: 'https://www.flaticon.com/premium-icon/icons/svg/2731/2731814.svg',
        email: '',
        password: ''
      }
    }
  }
  
  logoutClick(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

}

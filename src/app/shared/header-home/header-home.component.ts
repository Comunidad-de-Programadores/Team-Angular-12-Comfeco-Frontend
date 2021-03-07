import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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

  userData;
  subscription: Subscription;

  constructor(private router: Router,
              private userService: UserService) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userService.getUserSubject().subscribe(
      (res)=> {
        this.userData.nick = res.nick;
        this.userData.img = res.img;
      }
    )
  }

  logoutClick(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}

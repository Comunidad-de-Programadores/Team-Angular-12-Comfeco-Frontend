import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

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

  constructor(private router: Router) { 
    this.userData = JSON.parse(localStorage.getItem('user')); 
    console.log(this.userData);
    
  }

  ngOnInit(): void {
  }

  logoutClick(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

}

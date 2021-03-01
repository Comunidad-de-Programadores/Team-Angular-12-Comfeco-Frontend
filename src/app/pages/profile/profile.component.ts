import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};

  constructor() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit {

  activeView = 'profile';

  constructor() {
  }

  ngOnInit(): void {
  }

  changeMenu(option: string) {
    switch (option) {
      case 'profile':
        this.activeView = 'profile';
        break;
      case 'badges':
        this.activeView = 'badges';
        break;
      case 'groups':
        this.activeView = 'groups';
        break;
      case 'events':
        this.activeView = 'events';
        break;
      default: this.activeView = 'profile';
        break;
    }
  }

}

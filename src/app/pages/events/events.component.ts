import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  button;
  onEvent = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickJoin(idEvent: number){
    this.onEvent = true;
  }
  
  clickLeave(idEvent: number){
    this.onEvent = false;
  }

}

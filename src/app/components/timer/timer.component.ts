import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  //===
  // VARIABLES
  //===
  DATE_TARGET = new Date('12/01/2021 0:01 AM');
  // DOM for render
  days = 365;
  hours = 0;
  minutes = 0;
  seconds = 0;
  // Milliseconds for the calculations
  MILLISECONDS_OF_A_SECOND = 1000;
  MILLISECONDS_OF_A_MINUTE = this.MILLISECONDS_OF_A_SECOND * 60;
  MILLISECONDS_OF_A_HOUR = this.MILLISECONDS_OF_A_MINUTE * 60;
  MILLISECONDS_OF_A_DAY = this.MILLISECONDS_OF_A_HOUR * 24
  timerObs: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.count();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.timerObs.unsubscribe();
  }
  count() {
    this.timerObs = interval(this.MILLISECONDS_OF_A_SECOND).subscribe(
      resp => {
        this.updateCountdown();
      }
    );
  }

  updateCountdown() {
    const NOW = new Date();
    const DURATION = this.DATE_TARGET.getTime() - NOW.getTime();
    const REMAINING_DAYS = Math.floor(DURATION / this.MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor((DURATION % this.MILLISECONDS_OF_A_DAY) / this.MILLISECONDS_OF_A_HOUR);
    const REMAINING_MINUTES = Math.floor((DURATION % this.MILLISECONDS_OF_A_HOUR) / this.MILLISECONDS_OF_A_MINUTE);
    const REMAINING_SECONDS = Math.floor((DURATION % this.MILLISECONDS_OF_A_MINUTE) / this.MILLISECONDS_OF_A_SECOND);

    // Render
    this.days = REMAINING_DAYS;
    this.hours = REMAINING_HOURS;
    this.minutes = REMAINING_MINUTES;
    this.seconds = REMAINING_SECONDS;
  }
}

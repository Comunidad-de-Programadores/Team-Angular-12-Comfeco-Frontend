import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public button;
  public onEvent = false;
  public loading = true;
  public eventsList = [];
  public userEvents = [];
  private selectedEventId: string;


  constructor(private events: EventsService,
              private user: UserService,
              private toastr: ToastrService) { }

  async ngOnInit() {
    await this.getEvents();
    this.getUserEvents();
  }

  async clickJoin(eventId: string) {
    this.loading = true;

    try {

      const res: any = await this.events.joinEvent(eventId).toPromise();

      if (res.ok) {
        this.loading = false;
        this.toastr.success(res.mensaje);
      } else {
        this.loading = false;
        this.toastr.error(res.mensaje);
      }

    } catch (error) {
      this.loading = false;
      this.toastr.error(error.error.mensaje);
    }

    this.getEvents();
  }

  async clickLeave(eventId: string) {
    this.loading = true;
    this.selectedEventId = eventId;
  }

  hasJoined(event: any) {
    return event.join;
  }

  private async getEvents() {
    const res: any = await this.events.getEvents().toPromise();
    if (res.ok) {
      this.eventsList = res.listEvent;
    } else {
      console.log(res);
    }
    this.loading = false;
  }

  private async getUserEvents() {
    var res: any = await this.user.getUser().toPromise();
    const uid = res.userFound._id;

    res = await (await this.events.getUserEvents(uid)).toPromise();
    this.userEvents = res.listEvent;
  }

  async leaveEvent() {
    try {
      const res: any = await this.events.leaveEvent(this.selectedEventId).toPromise();

      if (res.ok) {
        this.loading = false;
        this.toastr.success(res.mensaje);
      } else {
        this.loading = false;
        this.toastr.error(res.mensaje);
      }
    } catch (error) {
      this.loading = false;
      this.toastr.error(error.error.mensaje);
    }

    this.getEvents();
  }


}

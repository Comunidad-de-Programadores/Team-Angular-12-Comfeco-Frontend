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
  public loading = false;
  public eventsList = [];
  public userEvents = [];


  constructor(private events: EventsService,
              private user: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getUserEvents();
  }

  async clickJoin(eventId: string){
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
  
  }
  
  async clickLeave(eventId: string){
    this.loading = true;
 
    try{
      const res: any = await this.events.leaveEvent(eventId).toPromise();
  
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
  }

  hasJoined(event:any){
    return true;
  }

  private async getEvents(){
    const res: any = await this.events.getEvents().toPromise();
    if(res.ok){
      this.eventsList = res.listEvent;
      console.log(this.eventsList);
      
    }else {
      console.log(res);
    }
  }

  private async getUserEvents(){
    var res: any = await this.user.getUser().toPromise();
    const uid = res.userFound._id;

    res = await (await this.events.getUserEvents(uid)).toPromise();    
    this.userEvents = res.listEvent;
    console.log(this.userEvents);
    
  }


}

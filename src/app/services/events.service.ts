import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private BASE_URL = environment.baseUrl;
  private option;

  constructor(private http: HttpClient) { }

  private getHeader() {
    const tk = localStorage.getItem('token');
    this.option = {
      headers: new HttpHeaders({ 'access-token': `${tk}` })
    };
  }

  public getEvents() {
    this.getHeader();
    return this.http.get(`${this.BASE_URL}/event`, this.option);
  }

  public joinEvent(eventId: string) {
    this.getHeader();
    return this.http.post(`${this.BASE_URL}/event/${eventId}/join`, null, this.option);
  }

  public leaveEvent(eventId: string) {
    this.getHeader();
    return this.http.post(`${this.BASE_URL}/event/${eventId}/out`, null, this.option);
  }

  public async getUserEvents(uid: string) {
    this.getHeader();
    return this.http.get(`${this.BASE_URL}/user/${uid}/event`, this.option);
  }

}

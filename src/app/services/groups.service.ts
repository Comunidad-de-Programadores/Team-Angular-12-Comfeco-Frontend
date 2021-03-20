import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private url = environment.baseUrl;
  private option: any;
  private userData: any;

  constructor(private http: HttpClient) {}

  private getHeader() {
    const tk = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('user'));

    this.option = {
      headers: new HttpHeaders({ 'access-token': `${tk}` }),
    };
  }

  getGroups(name: string, language: string) {
    this.getHeader();

    return this.http.get(
      `${this.url}/group/?name=${name}&language_id=${language}`,
      this.option
    );
  }

  getMembersGroup() {
    this.getHeader();
    return this.http.get(
      `${this.url}/user/${this.userData._id}/group/`,
      this.option
    );
  }

  joinGroup(idGroup: string) {
    this.getHeader();
    return this.http.post(
      `${this.url}/group/${idGroup}/join`,
      null,
      this.option
    );
  }

  leaveGroup(idGroup: string) {
    this.getHeader();
    return this.http.post(
      `${this.url}/group/${idGroup}/out`,
      null,
      this.option
    );
  }
}

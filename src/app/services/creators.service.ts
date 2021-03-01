import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Creators } from '../models/creators.model';

@Injectable({
  providedIn: 'root'
})
export class CreatorsService {

  option;

  private url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {

  }

  getHeader() {
    const tk = localStorage.getItem('token');
    this.option = {
      headers: new HttpHeaders({ 'access-token': `${tk}` })
    };
  }

  loadCreators() {
    this.getHeader();
    return this.http.get<Creators>(`${this.url}/creator`, this.option);
  }
}

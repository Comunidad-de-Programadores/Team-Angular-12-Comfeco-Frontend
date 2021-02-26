import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarruselUno } from '../models/carruselUno';

@Injectable({
  providedIn: 'root'
})
export class CarruselUnoService {

  carruseluno : CarruselUno[];
  option;
  
  private url = environment.baseUrl;

      constructor(private http: HttpClient)
      {

      }

  getHeader() {
      const tk = localStorage.getItem('token');
      this.option = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','access-token': `${tk}` })
      };
  }
      
  loadCarruselUno()
  {
      this.getHeader();
      return this.http.get<CarruselUno[]>(`${ this.url }/creator`, this.option);
  }
}

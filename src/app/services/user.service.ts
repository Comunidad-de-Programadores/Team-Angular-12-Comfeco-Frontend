import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl;
  option;

  constructor(private http: HttpClient) { }

  getHeader() {
    const tk = localStorage.getItem('token');
    this.option = {
      headers: new HttpHeaders({ 'access-token': `${tk}` })
    };
  }

  createUser(user: User) {
    return this.http.post(`${ this.url }/user/register`, user).pipe(
      catchError(e => {
        return throwError(e.error.error.errors);
      })
    );
  }

  logIn(email: string, password: string) {
    const credentials = {
      email,
      password
    };

    return this.http.post(`${ this.url }/user/login`, credentials).pipe(
      catchError(e => {
        return throwError(e.error.mensaje);
      })
    );
  }
  
  sendEmail(email: string) {
    return this.http.post(`${ this.url }/user/sendemail`, { email }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  changePassword(token: string, newpassword: string) {
    return this.http.post(`${ this.url }/user/changePassword`, { token, newpassword }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  putUser(value){
    this.getHeader();
    const body = new FormData();

    body.append('nick', value.nick);
    body.append('img', value.nick);
    body.append('public_id', value.nick);
    body.append('gender', value.nick);
    body.append('birthday', value.nick);
    body.append('country', value.nick);
    body.append('biography', value.nick);
    body.append('socialNetwork', value.nick);

    return this.http.put(`${ this.url }/user`, body , this.option)
  }



}

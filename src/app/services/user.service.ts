import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userSubject = new  BehaviorSubject<any>(this.getInitValue());
  private url = environment.baseUrl;
  option;

  constructor(private http: HttpClient) { 
  }

  private getHeader() {
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
    body.append('img', value.img);
    body.append('gender', value.gender);
    body.append('birthday', value.birthday);
    body.append('country', value.country);
    body.append('biography', value.biography);
    value.socialNetwork.forEach(element => {
      body.append('socialNetwork', element);
    });

    return this.http.put(`${ this.url }/user`, body , this.option)
  }

  getUser(){
    this.getHeader();
    return this.http.get(`${this.url}/user`, this.option)
  }

  getUserSubject(){
    return this.userSubject;
  }

  setUserSubect(data){
    this.userSubject.next(data);
  }

  private getInitValue(){
    return JSON.parse(localStorage.getItem('user'));
  }


}

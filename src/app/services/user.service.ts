import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://comfeco.herokuapp.com/user';

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(`${ this.url }/register`, user).pipe(
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

    return this.http.post(`${ this.url }/login`, credentials).pipe(
      catchError(e => {
        return throwError(e.error.mensaje);
      })
    );
  }
  
  sendEmail(email: string) {
    const body = {
      email
    }
    return this.http.post(`${ this.url }/sendemail`, body).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}

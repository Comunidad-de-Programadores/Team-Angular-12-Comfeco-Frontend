import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

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
}

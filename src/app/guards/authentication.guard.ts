import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {

  }
  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.toastr.error('Debe iniciar sesion primero');
      this.router.navigate(['auth/login']);
      return false;
    }

  }

}

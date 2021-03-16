import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private user: UserService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.form.get('email').setValue(localStorage.getItem('email'));
      this.form.get('rememberCheckbox').setValue(true);
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      rememberCheckbox: [false]
    });
  }

  loginClick(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.loading = true;

      if (this.form.get('rememberCheckbox').value === true) {
        localStorage.setItem('email', this.form.get('email').value);
      } else {
        localStorage.removeItem('email');
      }

      this.user.logIn(email, password).subscribe((res: any) => {
        const user = res.userFound;
        delete user.password;
        this.loading = false;
        this.toastr.info('Bienvenido ' + res.userFound.nick + '!');

        // Guarda datos de usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Guarda datos de token <--
        localStorage.setItem('token', res.token);

        // Navegar al inicio
        this.router.navigateByUrl('/client');
      }, err => {
        this.loading = false;
        this.toastr.error(err);
      });
    } else {
      this.toastr.error('Formulario no valido');
    }
  }

  checkValid(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }
}

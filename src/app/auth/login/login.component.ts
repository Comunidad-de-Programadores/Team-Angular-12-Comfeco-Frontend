import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
               private user: UserService ) {   
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      recordar: [false]
    });

  }

  loginClick(): void{
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.loading = true;

    this.user.logIn(email, password).subscribe((res: any) => {
      this.loading = false;
      this.toastr.info('Bienvenido '+ res.userFound.nick + '!');
    }, err => {
      this.loading = false;
      this.toastr.error(err);
    });
  }

  checkValid(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }
}

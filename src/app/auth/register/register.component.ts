import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../services/validators.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  //inicia una instancia para crear grupos de formulario
  form: FormGroup;

  loading = false;

  createUserSubscription: Subscription;

  constructor(
    //instancia para crear elementos de formulario
    private fb: FormBuilder,

    //instancia para validaciones de campos
    private validador: ValidatorsService,

    private user: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    //ejecuta la inicialiacion del formulario
    this.createForm();
  }

  ngOnInit(): void {
  }

  // crea el formulario
  createForm(): void {
    this.form = this.fb.group({
      nick: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {

      //a nivel de formulario cuando los campos ya han sido creados
      validators: this.validador.samesPasswordService('password', 'confPassword')
    });
  }

  //guarda los datos ingresados para registrar al usuario
  register() {
    if (this.form.valid) {
      const user: User = {
        nick: this.form.value.nick,
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.loading = true;

      this.createUserSubscription = this.user.createUser(user).subscribe((res: any) => {
        const user = res.userSaved; // <--
        // Guarda datos de usuario en localStorage <--
        localStorage.setItem('user', JSON.stringify(user));
        // Guarda datos de token <-- 
        localStorage.setItem('token', res.token);
        this.loading = false;
        this.toastr.success(res.ok === true ? 'Usuario creado exitosamente' : res.ok);

        // Navegar al inicio
        this.router.navigateByUrl('/client');
      }, err => {
        if (err?.email.kind) {
          this.toastr.error(err.email.kind === 'unique' ? 'Ya existe una cuenta asociada a este correo electrónico' : 'Error al generar el usuario');
        } else {
          this.toastr.error('Error desconocido');
        }
        this.loading = false;
      });
    } else {
      this.toastr.error('Formulario no valido');
    }

    this.form.reset();
  }

  inputValid(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  samePassword() {
    const password1 = this.form.get('password').value;
    const password2 = this.form.get('confPassword').value;

    return (password1 === password2) ? false : true;
  }

  ngOnDestroy(): void {
    this.createUserSubscription?.unsubscribe();
  }
}

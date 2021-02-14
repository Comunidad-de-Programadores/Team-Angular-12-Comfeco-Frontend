import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //inicia una instancia para crear grupos de formulario
  form: FormGroup;

  constructor(
    //instancia para crear elementos de formulario
    private fb: FormBuilder,

    //instancia para validaciones de campos
    private validador: ValidatorsService
  ) {
    //ejecuta la inicialiacion del formulario
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  // crea el formulario
  crearFormulario(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', [Validators.required, Validators.minLength(8)]]
    },{

      //a nivel de formulario cuando los campos ya han sido creados
      validators: this.validador.samesPasswordService('password', 'confPassword')
    });
  }

  //guarda los datos ingresados para registrar al usuario
  registrar(){
    console.log(this.form);
  }

  inputValid(campo: string){
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  samePassword(){
    const password1 = this.form.get('password').value;
    const password2 = this.form.get('confPassword').value;

    return ( password1 === password2 ) ? false : true;
  }

}

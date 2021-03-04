import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-editar-perfil-password',
  templateUrl: './editar-perfil-password.component.html',
  styleUrls: ['./editar-perfil-password.component.css']
})
export class EditarPerfilPasswordComponent implements OnInit {
  formEditPerfilPassword: FormGroup;
  
  constructor(public validador: ValidatorsService,private fb: FormBuilder,)
  {
     //ejecuta la inicialiacion del formulario
    this.createForm();
  }

  createForm(): void {
    this.formEditPerfilPassword = this.fb.group(
    {
      passwordInput: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordRepeatInput: new FormControl('', [Validators.required, Validators.minLength(8)])
    } , {
        //a nivel de formulario cuando los campos ya han sido creados
      validators: this.validador.samesPasswordService('passwordInput', 'passwordRepeatInput')
    });
  }
  
  ngOnInit(): void {
  }

  //Show the password with those function with the event.
  mostrarPassword()
  {
    var cambio = document.getElementById("passwordInput") as HTMLInputElement;
    if(cambio.type == "password"){
      cambio.type = "text";
      document.getElementById('iconShow').removeAttribute('class');
      document.getElementById('iconShow').setAttribute('class','fa fa-eye')
    }
    else
    {
      cambio.type = "password";
      document.getElementById('iconShow').removeAttribute('class');
      document.getElementById('iconShow').setAttribute('class','fa fa-eye-slash');
    }
  };

  showPasswordRepeat()
  {
    var cambio = document.getElementById("passwordRepeatInput") as HTMLInputElement;
    if(cambio.type == "password"){
      cambio.type = "text";
      document.getElementById('iconShowRepeat').removeAttribute('class');
      document.getElementById('iconShowRepeat').setAttribute('class','fa fa-eye')
    }
    else
    {
      cambio.type = "password";
      document.getElementById('iconShowRepeat').removeAttribute('class');
      document.getElementById('iconShowRepeat').setAttribute('class','fa fa-eye-slash');
    }
  };

  samePassword() {
    const password1 = this.formEditPerfilPassword.get('passwordInput').value;
    const password2 = this.formEditPerfilPassword.get('passwordRepeatInput').value;

    return (password1 === password2) ? false : true;
  }

  inputValid(campo: string) {
    return this.formEditPerfilPassword.get(campo).invalid && this.formEditPerfilPassword.get(campo).touched;
  }
}

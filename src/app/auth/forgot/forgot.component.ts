import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sendEmailSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private toast: ToastrService
  ) {
    this.crearFormulario();
  }
  
  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  inputValid(campo: string){
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  sendData(){
    this.sendEmailSubscription = this.user.sendEmail(this.form.value.email).subscribe((res: any) => {
      this.toast.success('Se ha enviado el correo a: ' + this.form.value.email);
      
      this.form.reset();
    }, err => {
      this.toast.error('Ocurrio un error al intentar recuperar la contraseña.');
    });
  }

  ngOnDestroy(): void {
    this.sendEmailSubscription?.unsubscribe();
  }
}

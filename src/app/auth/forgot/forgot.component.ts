import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  form: FormGroup;

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
    console.log(this.form.value);
    const email = this.form.value.email;

    this.user.sendEmail(email).subscribe((res: any) => {
      this.toast.success('Se ha enviado el correo a: '+ email);
    });
  }

}

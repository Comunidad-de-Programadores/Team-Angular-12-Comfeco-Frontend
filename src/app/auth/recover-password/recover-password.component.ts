import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  form: FormGroup;
  loading = false;
  token = '';
  
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private user: UserService,
              private route: ActivatedRoute,
              private router: Router) { 
                this.crearFormulario();
              }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      newpassword: ['', [Validators.required]]
    });
  }

  updatePassword() {
    this.loading = true;
    const newPassord = this.form.value.newpassword;

    this.user.changePassword(this.token, newPassord).subscribe((res: any) => {
      this.toastr.success('Contraseña actualizada correctamente');
      this.router.navigate(['login']);
      this.loading = false;
    }, err => {
      this.toastr.error(err.error.mensaje ? err.error.mensaje : 'Ha ocurrido un error inesperado.')
      this.loading = false;
    });
  }

  checkValid(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

}

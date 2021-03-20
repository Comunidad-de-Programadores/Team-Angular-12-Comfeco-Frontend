import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

//validaciones asincronas y validaciones personalizadas
export class ValidatorsService {

  constructor() { }

  samesPasswordService(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const passwordForm1 = formGroup.controls[pass1];
      const passwordForm2 = formGroup.controls[pass2];

      if (passwordForm1.value === passwordForm2.value) {
        passwordForm2.setErrors(null);
      } else {
        passwordForm2.setErrors({ noSame: true });
      }
    }
  }
}

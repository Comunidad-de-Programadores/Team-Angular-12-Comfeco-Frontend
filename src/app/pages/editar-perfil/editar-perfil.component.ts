import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

//Podemoms usar jQuery, ahora
// declare var jQuery:any;
// declare var $:any;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  file: File;
  nameFile: string;
  imagePath: string|ArrayBuffer;
  listCountries = [];

  formEdit = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    gender: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    biography: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    twitter: new FormControl('', [Validators.required]),
  });

  constructor(private countries: CountryService) {
   }

  ngOnInit(): void {

    this.getCountries();
    this.initForm();

  //   document.getElementById("file").onchange = function (e:Event) {
  //   // Creamos el objeto de la clase FileReader
  //   let reader = new FileReader();

  //   const target = e.target as HTMLInputElement;

  //   // Leemos el archivo subido y se lo pasamos a nuestro fileReader
  //   reader.readAsDataURL(target.files[0]);

  //   // Le decimos que cuando este listo ejecute el código interno
  //   reader.onload = function () {
  //     let preview = document.getElementById('preview');

  //     let img = <HTMLImageElement> document.createElement('img');

  //     img.setAttribute("src", reader.result as string);
  //     img.setAttribute("style", "border-radius:50%;width:8em;height:8em;margin-top:-125px;");

  //     //preview.innerHTML = '';
  //     preview.append(img);
  //   };
  // }
}

changeListener($event): void {
  this.file = $event.target.files[0];
  console.log(this.file);
  this.nameFile = this.file['name'];
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  const file: File = inputValue.files[0];
  const myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.imagePath = myReader.result;
  };
  
  myReader.readAsDataURL(file);
}

async getCountries(){
  const res: any = await this.countries.getCountries().toPromise();
  this.listCountries = res;
}

initForm(){
  this.formEdit.get('nick').setValue('123');
}






// mostrarPassword()
// {
//   var cambio = document.getElementById("passwordInput") as HTMLInputElement;
//   if(cambio.type == "password"){
//     cambio.type = "text";
//     $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
//   }
//   else
//   {
//     cambio.type = "password";
//     $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
//   }
// };

// mostrasPasswordRepeat()
// {
//   var cambio = document.getElementById("passwordRepeatInput") as HTMLInputElement;
//   if(cambio.type == "password"){
//     cambio.type = "text";
//     $('#iconShow').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
//   }
//   else
//   {
//     cambio.type = "password";
//     $('#iconShow').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
//   }
// };

}

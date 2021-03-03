import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { Country, ListCountries } from 'src/app/models/Country';
import { EditUserServiceService } from './edit-user-service.service';
=======
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
>>>>>>> 5d85f7a49387cea34a14585134350068f606201d

//Podemoms usar jQuery, ahora
// declare var jQuery:any;
// declare var $:any;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})


export class EditarPerfilComponent implements OnInit {
  
  //Load Countries, created result countries from service
  listCountries: ListCountries;
  arrayResultFromService: Array<String> = [];

  constructor(public servicecountries: EditUserServiceService)
  {
  }

<<<<<<< HEAD
  /*loadDates(pais:String)
  {
    this.listCountries = this.service.getCountriesCountrys(pais);
    console.log(this.listCountries);
  }*/

  ngOnInit(): void {

    //Load input time real
    const countriesInput = document.getElementById('countryInput') as HTMLInputElement;
    
    countriesInput.addEventListener("input", () => 
    {
      this.arrayResultFromService = this.servicecountries.getCountriesCountrys(countriesInput.value);

      //console.log("x-> " + this.servicecountries.getCountriesCountrys(countriesInput.value));
    });


    //Load default pictures
    let preview = document.getElementById('preview');

    preview.setAttribute("style", "background:url('../assets/img/user-edit/user-empty.png') no-repeat center;background-size:115px;background-color:gray;");

    document.getElementById("file").onchange = function (e:Event)
    {
      // Creamos el objeto de la clase FileReader
      let reader = new FileReader();
      const target = e.target as HTMLInputElement;

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(target.files[0]);

      // Le decimos que cuando este listo ejecute el código interno
      reader.onload = function ()
      {
        let preview = document.getElementById('preview');

        let img = <HTMLImageElement> document.createElement('img');

        img.setAttribute("src", reader.result as string);
        img.setAttribute("id", "newImgEditUser");
        img.setAttribute("style", "border-radius:50%;width:8em;height:8em;margin-top:-129px;");

        //preview.innerHTML = '';
        preview.append(img); 
      };
  }


  
}

//Show the password with those function with the event.
mostrarPassword()
{
  var cambio = document.getElementById("passwordInput") as HTMLInputElement;
  if(cambio.type == "password"){
    cambio.type = "text";
    $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
  }
  else
  {
    cambio.type = "password";
    $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
  }
};

mostrasPasswordRepeat()
{
  var cambio = document.getElementById("passwordRepeatInput") as HTMLInputElement;
  if(cambio.type == "password"){
    cambio.type = "text";
    $('#iconShow').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
  }
  else
  {
    cambio.type = "password";
    $('#iconShow').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
  }
};
=======
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
  console.log(this.listCountries);
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
>>>>>>> 5d85f7a49387cea34a14585134350068f606201d

}

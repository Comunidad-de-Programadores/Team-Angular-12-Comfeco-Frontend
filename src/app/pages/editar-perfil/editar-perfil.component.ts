import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country, ListCountries } from 'src/app/models/Country';
import { EditUserServiceService } from './edit-user-service.service';

//Podemoms usar jQuery, ahora
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})


export class EditarPerfilComponent implements OnInit
{
  //Load Countries, created result countries from service
  listCountries: ListCountries;
  arrayResultFromService: Array<String> = [];
  resultado: string;
  
  //Form React
  formEditPerfil = new FormGroup({
    nickInput: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    generoInput: new FormControl('', [Validators.maxLength(60)]),
    dateBirthInput: new FormControl('', [Validators.required]),
    countryInput: new FormControl('', [Validators.required]),
    facebookInput: new FormControl('', [ Validators.maxLength(60)]),
    githubInput: new FormControl('', [ Validators.maxLength(60)]),
    linkedinInput: new FormControl('', [ Validators.maxLength(60)]),
    twitterInput: new FormControl('', [ Validators.maxLength(60)]),
    biografiaInput: new FormControl('', [Validators.maxLength(1000)]),
  });

  submit() {
    if (this.formEditPerfil.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }

  constructor(public servicecountries: EditUserServiceService)
  {
  }

  //Load county selected in input from form 
  public selectedCountry(countrySelected: any):void
  {
      const containerInputCountry = document.getElementById('countryInput') as HTMLInputElement;
      containerInputCountry.value = countrySelected;
      var containerListCountriesUl = document.getElementById('listCountriesUl');
      containerListCountriesUl.style.display = 'none';
  };

  ngOnInit(): void {
   
    //Load input time real
    const countriesInput = document.getElementById('countryInput') as HTMLInputElement;
    
    countriesInput.addEventListener("input", () => 
    {
      this.arrayResultFromService = this.servicecountries.getCountriesCountrys(countriesInput.value);

      //Show List Countries
      var containerListCountriesUl = document.getElementById('listCountriesUl');
      containerListCountriesUl.style.display = 'block';
    });

    //countriesInput.addEventListener("blur", () => 
    //{
      //No show List Countries
      //var containerListCountriesUl = document.getElementById('listCountriesUl');
     // containerListCountriesUl.style.display = 'none';
    //});

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
        img.setAttribute("style", "border-radius:50%;width:8em;height:8em;margin-top:-80px;");

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

}

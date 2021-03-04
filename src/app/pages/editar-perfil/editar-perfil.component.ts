import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country, ListCountries } from 'src/app/models/Country';
import { EditUserServiceService } from './edit-user-service.service';



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
  
  submit() {
    if (this.formEditPerfil.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }

  constructor(public servicecountries: EditUserServiceService, private fb: FormBuilder)
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

  //Form React
     formEditPerfil = new FormGroup({
      nick: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      emailInput: new FormControl('', [Validators.required, Validators.email]),
      generoInput: new FormControl('', [Validators.maxLength(60)]),
      dateBirthInput: new FormControl('', [Validators.required]),
      countryInput: new FormControl('', [Validators.required]),
      facebookInput: new FormControl('', [ Validators.maxLength(60)]),
      githubInput: new FormControl('', [ Validators.maxLength(60)]),
      linkedinInput: new FormControl('', [ Validators.maxLength(60)]),
      twitterInput: new FormControl('', [ Validators.maxLength(60)]),
      biografiaInput: new FormControl('', [Validators.maxLength(1000)])
    });


  checkValid(campo: string)
  {
    return this.formEditPerfil.get(campo).invalid && this.formEditPerfil.get(campo).touched;
  }

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

}

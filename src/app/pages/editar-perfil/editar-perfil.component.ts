import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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


export class EditarPerfilComponent implements OnInit {
  
  //Load Countries, created result countries from service
  listCountries: ListCountries;
  arrayResultFromService: Array<String> = [];

  constructor(public servicecountries: EditUserServiceService)
  {
  }

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

}

import { Injectable } from '@angular/core';
import { Country, ListCountries } from 'src/app/models/Country';
import { filter } from 'rxjs/operators';


//Import json file
import listCountriesExt from 'src/assets/json/paises.json';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {  providedIn: 'root'}
)
export class EditUserServiceService {

  listCountries: any =listCountriesExt.countries;
  arrayResult: Array<String> = [];

  //Service to search countries by the Inpùt about Countries in form
  getCountriesCountrys(pais: String): String[]
  {
    //Load json un variable
    let list = this.listCountries;
    //Created new array to save result
    
    this.arrayResult.length = 0;
    for (let object of list)
    {
      //arrayResult.length=0;
      if(object['name_es'].toLowerCase().includes(pais) || object['name_es'].toUpperCase().includes(pais))
      {
        //console.log("For " + object['name_es']);
        this.arrayResult.push(object['name_es']);
        //console.log("A " + object['name_es']);
      }
    }

    return this.arrayResult;
  }
  constructor(private http: HttpClient)
  {
  }

}

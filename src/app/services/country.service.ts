import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get('https://restcountries.eu/rest/v2/all')
    .pipe(
      map(
        (res: any)=>{
          return res.map(country=>({ name: country.name }));
        }
      )
    )
  }
}

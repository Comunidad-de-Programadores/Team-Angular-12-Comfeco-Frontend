import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarruselUno } from 'src/app/models/carruselUno';
import { CarruselUnoService } from 'src/app/services/carrusel-uno.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

  constructor(private route: ActivatedRoute,  public carruselunoservice: CarruselUnoService)
  {

  }

  ngOnInit(): void
  {
    this.getCarruselUnos();
  }

  //Load service from community.service
  async getCarruselUnos()
  {
   this.carruselunoservice.loadCarruselOne().subscribe(
      (response) => {
        this.carruselunoservice.carruseluno = response['listCreator'];
        //console.log("ARRAY "+  response);
      },
      (error) => {
        console.error(error);
      }
    );
    //const res = await this.carruselunoservice.loadCarruselUno().toPromise(); // <--
    //console.log(res); // <--
  }

}

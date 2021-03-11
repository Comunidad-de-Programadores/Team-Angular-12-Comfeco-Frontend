import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  insignia = [
    {
      id: 0,
      img: 'https://res.cloudinary.com/dgnyjce9p/image/upload/v1615414256/aprobado_avtypt.png',
      name: 'Sociable',
      description: 'Todos quieren conocerte',
      howtoWin: 'Debes completar tu perfil completamente, los campos de redes sociales puede ser ocpional'
    },
    {
      id: 1,
      img: 'https://res.cloudinary.com/dgnyjce9p/image/upload/v1615414342/insignias-de-recompensa_eodt3o.png',
      name: 'Invatible',
      description: 'Poco a poco se logra grandes cosas',
      howtoWin: 'Debes participar en un evento al menos 1 ves'
    },
    {
      id: 2,
      img: 'https://res.cloudinary.com/dgnyjce9p/image/upload/v1615414791/exito_kdyfrb.png',
      name: 'Amistoso',
      description: 'Todos para uno y uno para todos',
      howtoWin: 'Debes unirte a un grupo por primera ves'
    },
    {
      id: 3,
      img: 'https://res.cloudinary.com/dgnyjce9p/image/upload/v1615415138/insignia_auxsqb.png',
      name: 'Trabajador',
      description: 'La grandesa sera es para los que no se rinden',
      howtoWin: 'Debes completa las 3 primeras medallas para ser maestro pokemon'
    }
]

  constructor() { }

  ngOnInit(): void {
    console.log(this.insignia);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

  creators = [
    {
      "_id": "6031c6b146f6b7f515a10e86",
      "name": "Nicolas Molina",
      "img": "https://www.comfeco.com/images/leaders/leader-nicolas_molina.webp",
      "technologyImg": "https://www.comfeco.com/icons/angular-icon.svg",
      "technology": "Angular",
      "description": "Ninguna",
      "socialNetwork": "https://www.facebook.com/me"
    },
    {
      "_id": "6031cb1238b06da8851045c3",
      "name": "Cristopher Paniagua",
      "technology": "Vue js",
      "technologyImg": "https://www.comfeco.com/icons/vue-icon.svg",
      "img": "https://www.comfeco.com/images/leaders/leader-cristopher_paniagua.webp",
      "socialNetwork": "https://www.facebook.com/",
      "description": ""
    },
    {
      "_id": "6031cdc638b06da8851045c9",
      "name": "Vanessa Marely",
      "technology": "React js",
      "technologyImg": "https://www.comfeco.com/icons/react-icon.svg",
      "img": "https://www.comfeco.com/images/leaders/leader-vanessa_marely.webp"
    }
  ];

  sponsors = [
    {
      firstGroup: [
        {
          "image": "https://elrincondechina.com/wp-content/uploads/2018/05/Huawei-Logo.jpg"
        },
        {
          "image": "https://tekki.tv/images/logo.png"
        },
        {
          "image": "https://yt3.ggpht.com/ytc/AAUvwngrdKYyADnSuvrq4MSPGeBC9kTjgF8gbnOHa0EHwg=s900-c-k-c0x00ffffff-no-rj"
        },
      ]
    },{
      secondGroup: [
        {
          "image": "https://www.bing.com/images/blob?bcid=TurAkHithHAChdhbJpv2WeZyDSd3.....2U"
        },
        {
          "image": "https://yt3.ggpht.com/ytc/AAUvwnhu4jnGH_7q2lPHvWFLWbh6s7B-keAo9OYfzkHFxQ=s900-c-k-c0x00ffffff-no-rj"
        },
        {
          "image": "https://pbs.twimg.com/profile_images/1338964981824557056/7SUbPuSR_400x400.jpg"
        }
      ]
    },{
      thirdGroup: [
        {
        "image": "https://yt3.ggpht.com/ytc/AAUvwnj37gtrISnOsTIj4fo5Q_AhCRIeMxU3GNdBhEWWYA=s900-c-k-c0x00ffffff-no-rj"
        },
        {
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoHpV3sCk-T0NWhCFcq7SSNnJ1mpiDhMVGrg&usqp=CAU"
        },
        {
        "image": "https://congreso.latamdev.co/wp-content/uploads/sites/4/2020/02/logo-latam-dev.png"
        },
      ]
    },
    {
      fourthGroup: [
        {
          "image": "https://juancitopena.github.io/Las-Mejores-Web-Para-Aprender/assets/imagenes/codigofacilito.png"
        },
        {
          "image": "https://pbs.twimg.com/profile_images/735242324293210112/H8YfgQHP_400x400.jpg"
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

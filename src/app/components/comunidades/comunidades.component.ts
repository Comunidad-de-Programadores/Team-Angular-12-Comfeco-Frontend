import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CommunityService } from 'src/app/services/community.service';


@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  
  token = '';


  constructor(private route: ActivatedRoute,  public communityservice: CommunityService)
  {

  }

  ngOnInit(): void
  {
    this.getCommunities();  
  }

  //Load service from community.service
  async getCommunities()
  {
   this.communityservice.loadCommunity().subscribe(
      (response) => {
        this.communityservice.communities = response["listCommunity"];
        // console.log("ARRAY "+  this.communityservice.communities['name']);
      },
      (error) => {
        console.error(error);
      }
    );
    //const res = await this.communityservice.loadCommunity().toPromise(); // <--
    //console.log(res); // <--
  }

}

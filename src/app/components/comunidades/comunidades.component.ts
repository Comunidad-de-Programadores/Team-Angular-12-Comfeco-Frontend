import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  
  token = '';

  constructor(private route: ActivatedRoute,  private communityservice: CommunityService)
  {

  }

  ngOnInit(): void
  {
    this.getCommunities();
  }

  async getCommunities()
  {
    const res = await this.communityservice.loadCommunity().toPromise(); // <--
    console.log(res); // <--
  }

}

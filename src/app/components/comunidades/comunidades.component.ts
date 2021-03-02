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

  listCommunity;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private communityservice: CommunityService
  ) {
  }

  ngOnInit(): void {
    this.getCommunities();
  }

  async getCommunities() {
    const res: any = await this.communityservice.loadCommunity().toPromise();
    //console.log(res);
    this.listCommunity = res.listCommunity;
    this.loading = false;
  }

}

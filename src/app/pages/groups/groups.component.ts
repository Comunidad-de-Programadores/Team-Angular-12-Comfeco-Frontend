import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  myGroup: any = {};
  listGroups = [];
  loading = true;
  hasGroup: boolean;
  hasListGroups: boolean;
  languages = [{
    name: 'Typescript',
    id: 0
  },
  {
    name: 'Javascript',
    id: 1
  },
  {
    name: 'Ruby',
    id: 2
  },
  {
    name: 'Java',
    id: 3
  },
  {
    name: 'Pyton',
    id: 4
  },
  {
    name: 'UX',
    id: 5
  }
  ];

  constructor(
    private groups: GroupsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMembers();
    this.getGroups();
  }

  async getMembers() {
    try {
      const res: any = await this.groups.getMembersGroup().toPromise();
      if (res.ok) {
        this.myGroup = res.listGroup;
        this.hasGroup = true;
      } else {
        this.toastr.error('No se pudieron cargar los miembros del Grupo', 'Error al cargar los integrantes');
        this.hasGroup = false;
      }
      this.loading = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.hasGroup = false;
    }

  }

  async getGroups() {
    try {
      const res: any = await this.groups.getGroups('', '').toPromise();
      if (res.ok) {
        this.listGroups = res.listGroup;
        this.hasListGroups = true;
      } else {
        this.toastr.error('No se pudieron cargar los Grupos', 'Error al cargar los grupos');
        this.hasListGroups = false;
      }
      this.loading = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.hasListGroups = false;
    }
  }

  async joinGroup(groupId: string) {
    try {
      const res: any = await this.groups.joinGroup(groupId).toPromise();
      if (res.ok) {
        this.toastr.success(res.mensaje, 'Éxito');
      } else {
        this.toastr.error(res.mensaje, 'Error');
      }
      this.getMembers();
      console.log(res);
    } catch (error) {
      this.toastr.error(error.error.mensaje);
    }

    this.loading = false;
  }
  
  async leaveGroup() {
    try {
      const res: any = await this.groups.leaveGroup(this.myGroup.id).toPromise();
      if (res.ok) {
        this.toastr.success(res.mensaje, 'Éxito');
        this.hasGroup = false;
      } else {
        this.toastr.error(res.mensaje, 'Error');
      }
      console.log(res);
    } catch (error) {
      this.toastr.error(error.error.mensaje);
    }

    this.loading = false;
  }

}

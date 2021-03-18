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
  loadingMembers = true;
  loadingGroups = true;
  loading = true;
  hasGroup: boolean;
  hasListGroups: boolean;
  languageSelected = '';
  term = '';
  languages = [{
    name: 'Typescript',
    id: 0,
    color: '#36b9cc'
  },
  {
    name: 'Javascript',
    id: 1,
    color: '#f6c23e'
  },
  {
    name: 'Ruby',
    id: 2,
    color: '#e74a3b'
  },
  {
    name: 'Java',
    id: 3,
    color: '#5a5c69'
  },
  {
    name: 'Pyton',
    id: 4,
    color: '#4e73df'
  },
  {
    name: 'UX',
    id: 5,
    color: '#1cc88a'
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
      this.loadingMembers = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.hasGroup = false;
      this.loadingMembers = false;
    }

  }

  async getGroups() {
    try {
      const res: any = await this.groups.getGroups(this.term, this.languageSelected).toPromise();
      if (res.ok) {
        this.listGroups = res.listGroup;
        this.listGroups.map((group: any) => {
            this.languages.map(language => {
              if (group.programming_language_id === language.id) {
                group.language = language.name;
                group.color = language.color;
              }
            });
        });
        console.log('Nueva lista ', this.listGroups);
        this.hasListGroups = true;
      } else {
        this.toastr.error('No se pudieron cargar los Grupos', 'Error al cargar los grupos');
        this.hasListGroups = false;
      }
      this.loadingGroups = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.hasListGroups = false;
      this.loadingGroups = false;
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

  changeLanguage(e) {
    this.languageSelected = e.target.value;
    this.getGroups();
  }

  searchGroups(term: string) {
    this.term = term;
    this.getGroups();
  }

}
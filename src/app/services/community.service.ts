import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Community } from '../models/community.model';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable
    ({
        providedIn: 'root'
    })

export class CommunityService {
    option:any;

    private url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getHeader() {
        const tk = localStorage.getItem('token');
        this.option = {
            headers: new HttpHeaders({ 'access-token': `${tk}` })
        };
    }

    loadCommunity() {
        this.getHeader();
        return this.http.get<Community>(`${this.url}/community`, this.option);
    }
}
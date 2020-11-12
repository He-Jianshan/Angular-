import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../type';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private config: ConfigService,
    private httpClient: HttpClient) { }

  listRole(): Observable<IRole[]> {
    return this.httpClient.get<IRole[]>(this.config.getRoleUrl());
  }

  addRole(role: IRole): Observable<IRole> {
    return this.httpClient.post<IRole>(this.config.getRoleUrl(), role);
  }

  updateRole(name:string, role: IRole): Observable<IRole> {
    return this.httpClient.patch<IRole>(this.config.getRoleNameUrl(name), role);
  }
  
  deleteRole(role: IRole): Observable<IRole> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      body: role
    };

    return this.httpClient.delete<IRole>(this.config.getRoleUrl(), httpOptions);
  }
  
}

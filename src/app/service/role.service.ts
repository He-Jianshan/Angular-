import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
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

  updateRole(role: IRole): Observable<IRole> {
    return this.httpClient.put<IRole>(this.config.getRoleUrl(), role);
  }
  
  deleteRole(role: IRole): Observable<IRole> {
    return this.httpClient.delete<IRole>(this.config.getRoleNameUrl(role.name));
  }
  
}

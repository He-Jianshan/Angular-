import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private config: ConfigService,
    private httpClient: HttpClient) { }

  getUserList(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.config.getUserUrl())
  }

  addUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.config.getUserUrl(), user);
  }

  updateUser(username: string, user: IUser): Observable<IUser> {
    return this.httpClient.patch<IUser>(this.config.getUserNameUrl(username), user);
  }

  deleteUser(user: IUser): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      body: user
    };
    return this.httpClient.delete<IUser>(this.config.getUserUrl(), httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
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

  updateUser(user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.config.getUserUrl(), user);
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.config.getUserNameUrl(user.username));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ILogin, ILoginResult } from '../type';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private config: ConfigService) { }
  login(login: ILogin): Observable<ILoginResult> {
    return this.httpClient.get(this.config.getLoginUrl()).pipe(
      switchMap(r => this.httpClient.post<ILoginResult>(this.config.getLoginUrl(),login, 
      {headers: {"content-type": "application/json"},
      withCredentials: true}))
    );
  }
}

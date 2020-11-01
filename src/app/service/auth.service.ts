import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ILogin, ILoginResult, IResponse } from '../type';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private config: ConfigService) { }

  login(login: ILogin): Observable<ILoginResult> {
    // get csrf key first
    return this.httpClient.get(this.config.getLoginUrl()).pipe(
      switchMap(r => this.httpClient.post<ILoginResult>(this.config.getLoginUrl(),login))
    );
  }

  logout(): Observable<IResponse> {
    return this.httpClient.post<IResponse>(this.config.getLogoutUrl(),{});
  }
}

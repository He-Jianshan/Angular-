import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private ACCESS_KEY = '513276ca-bce3-446a-8dac-c9251fdd90ef';
  private  BASE_URL = `https://home.hejianshan.com/access/${this.ACCESS_KEY}`;
  constructor() { }
  getLoginUrl() {
    return `${this.BASE_URL}/user/token`;
  }
  getLogoutUrl() {
    return `${this.BASE_URL}/user/logout`;
  }
  getUserUrl() {
    return `${this.BASE_URL}/user/user`;
  }
  getUserNameUrl(username: string) {
    const name = encodeURI(username);
    return `${this.BASE_URL}/user/user/${name}`;
  }
  getRoleUrl() {
    return `${this.BASE_URL}/user/role`;
  }
  getRoleNameUrl(rolename:string) {
    const name = encodeURI(rolename);
    return `${this.BASE_URL}/user/role/${name}`;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private  BASE_URL = "https://home.hejianshan.com/edge";
  constructor() { }
  getLoginUrl() {
    return `${this.BASE_URL}/login/token`;
  }
}

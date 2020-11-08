import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResult, LOGIN } from '../type';
import { Select } from '@ngxs/store';
import { SidebarModel } from '../service/sidebar-state.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild("drawer") drawer: MatDrawer;
  @Select(s => s.auth) login$: Observable<ILoginResult>;
  @Select(s => s.sidebar) sidebar$: Observable<SidebarModel>;

  hasLogin: boolean = false;

  constructor() { 
  }
  ngAfterViewInit(): void {
    this.sidebar$.subscribe(()=>this.drawer!?.toggle())
  }

  ngOnInit(): void {
    this.login$.subscribe(l=> this.hasLogin = (l!?.status == LOGIN))
  }

}

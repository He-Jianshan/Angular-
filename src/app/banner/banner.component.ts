import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ILoginResult } from '../type';
import { LogoutAction } from '../service/mystate.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  username: string;

  @Select(s => s.auth) result$: Observable<ILoginResult>;

  constructor(private dialog: MatDialog,
    private store: Store) { }

  ngOnInit(): void {
    this.result$.subscribe(r=>this.username=r!?.status == 'SUCCESS' ? r.message : null)
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, { disableClose: true });
  }

  signOut(): void {
    this.store.dispatch(new LogoutAction());
  }
}

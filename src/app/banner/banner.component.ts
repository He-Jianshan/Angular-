import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { LogoutAction } from '../service/mystate.service';
import { ILoginResult } from '../type';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  username: string;

  @Select(s => s.auth) result$: Observable<ILoginResult>;

  constructor(private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.result$.pipe(
      tap(r=>this.username=r!?.status == 'SUCCESS' ? r.message : null),
      tap(r=>r && this.snackBar.open(r.message, r.status, {duration: 2000}))
    ).subscribe(r=>r)
    
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, { disableClose: true });
  }

  signOut(): void {
    this.store.dispatch(new LogoutAction());
  }
}

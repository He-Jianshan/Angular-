import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserFormComponent } from '../form/user-form/user-form.component';
import { UserService } from '../service/user.service';
import { IUser, IRole } from '../type';
import { SidebarModel } from '../service/sidebar-state.service';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ListUserAction, DeleteUserAction } from '../service/user-state.service';


const ELEMENT_DATA: IUser[] = [];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'username', 'email', 'roles', 'action'];
  dataSource = new MatTableDataSource<IUser>(ELEMENT_DATA);

  @Select(s => s.users.users) users$: Observable<IUser[]>;

  constructor(private userService:UserService,
    private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar) { }
  ngAfterViewInit(): void{
    this.store.dispatch(new ListUserAction())
  };

  ngOnInit(): void {
    this.users$
      .subscribe(us=> { this.dataSource.data = us})
  }
  openInput(): void {
    this.dialog.open(UserFormComponent, { disableClose: true });
  }
  openUpdate(user: IUser) {
    this.dialog.open(UserFormComponent, { disableClose: true,
    data: user });
  }
  deleteUser(user: IUser) {
    this.store.dispatch(new DeleteUserAction(user));
  }
  rolesToString(roles: IRole[]):string {
    return roles.map(r=>r.name).join(',');
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserFormComponent } from '../form/user-form/user-form.component';
import { UserService } from '../service/user.service';
import { IUser } from '../type';
import { SidebarModel } from '../service/sidebar-state.service';


const ELEMENT_DATA: IUser[] = [
  { username: 'Hydrogen', email: "joe@gmail.com", roles: [{name:'H'}]},
  { username: 'Helium', email: 'ben@gmail.com', roles: [{name:'He'}]},
 ];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = [ 'username', 'email', 'roles'];
  dataSource = ELEMENT_DATA;

  constructor(private userService:UserService,
    private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(us=> {if(us instanceof Array) this.dataSource = us})
  }
  openInput(): void {
    this.dialog.open(UserFormComponent, { disableClose: true });
  }

}

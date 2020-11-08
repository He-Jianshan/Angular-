import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IRole } from '../type';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListRoleAction, AddRoleAction } from '../service/role-state.service';
import { RoleFormComponent } from '../form/role-form/role-form.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = [ 'name'];
  dataSource = new MatTableDataSource<IRole>([]);

  @Select(s => s.roles.roles) roles$: Observable<IRole[]>;

  constructor(   private dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar) { }
  ngAfterViewInit(): void{
    this.store.dispatch(new ListRoleAction())
  };

  ngOnInit(): void {
    this.roles$.subscribe(roles => this.dataSource.data = roles)
  }
  openInput(): void {
    this.dialog.open(RoleFormComponent, { disableClose: true });
  }
 
}

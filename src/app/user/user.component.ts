import { Component, OnInit } from '@angular/core';
import { IUser } from '../type';


const ELEMENT_DATA: IUser[] = [
  { username: 'Hydrogen', email: "1.0079", roles: [{name:'H'}]},
  { username: 'Helium', email: '4.0026', roles: [{name:'He'}]},
 ];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = [ 'username', 'email', 'roles'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

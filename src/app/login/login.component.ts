import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { Store, Select } from '@ngxs/store';
import { LoginAction } from '../service/mystate.service';
import { ILoginResult } from '../type';
import { Observable } from 'rxjs';


export class UsernameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Select(s => s.auth) result$: Observable<ILoginResult>;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{4,}')
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new UsernameErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private store: Store) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.close();
  }

  submit(): void {
    this.store.dispatch(new LoginAction({username:this.usernameFormControl.value, password: this.passwordFormControl.value}));
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}

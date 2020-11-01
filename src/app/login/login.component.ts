import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { LoginAction } from '../service/mystate.service';


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


  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{4,}')
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new UsernameErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private store: Store,
    ) { }

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

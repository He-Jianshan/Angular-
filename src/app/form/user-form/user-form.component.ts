import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

export class UserErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{3,}')
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new UserErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<UserFormComponent>) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.close();
  }

  submit(): void {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}

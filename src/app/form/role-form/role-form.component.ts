import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';


export class RoleErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  rolenameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{4,}')
  ]);
  
  matcher = new RoleErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<RoleFormComponent>) { }

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

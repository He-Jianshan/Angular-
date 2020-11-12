import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngxs/store';
import { AddRoleAction, UpdateRoleAction } from 'src/app/service/role-state.service';
import { IRole } from 'src/app/type';


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
export class RoleFormComponent implements AfterViewInit {
  rolenameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{4,}')
  ]);
  
  matcher = new RoleErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRole,
    private store: Store) { }

  ngAfterViewInit(): void {
    if(this.data) {
      this.rolenameFormControl.setValue(this.data.name);
    }
  }
  cancel(): void {
    this.close();
  }

  submit(): void {
    if(this.data) {
      this.store.dispatch(new UpdateRoleAction(this.data.name, {name: this.rolenameFormControl.value}))
    } else {
      this.store.dispatch(new AddRoleAction({name: this.rolenameFormControl.value}))
    }
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}

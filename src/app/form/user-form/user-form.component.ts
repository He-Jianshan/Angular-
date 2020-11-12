import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ListRoleAction } from 'src/app/service/role-state.service';
import { AddUserAction, UpdateUserAction } from 'src/app/service/user-state.service';
import { IRole, IUser } from 'src/app/type';

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
export class UserFormComponent implements AfterViewInit {

  @Select(s => s.roles.roles) roles$: Observable<IRole[]>;

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
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolesFormControl = new FormControl();
  filteredRoles: Observable<IRole[]>;
  roles: IRole[] = [];
  allRoles: IRole[] = [];

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private store: Store) {
      this.filteredRoles = this.rolesFormControl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));

    }

  ngAfterViewInit(): void {
    this.store.dispatch(new ListRoleAction());
    this.roles$.subscribe(rs=>this.allRoles=rs);
    if(this.data) {
      this.usernameFormControl.setValue(this.data.username);
      this.emailFormControl.setValue(this.data.email);
      this.roles = this.data.roles ? this.data.roles.map(d=>({...d})) : [];
    }
  }

  close() {
    this.dialogRef.close();
  }

  cancel(): void {
    this.close();
  }

  submit(): void {
    const user = {
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
      email: this.emailFormControl.value,
      roles: this.roles
    };
    if(this.data) {
      this.store.dispatch(
        new UpdateUserAction(this.data.username, user));
    } else {
      this.store.dispatch(new AddUserAction(user));
    }
    this.close();
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our role
    if ((value || '').trim()) {
      this.roles.push({name:value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.rolesFormControl.setValue(null);
  }
  remove(role: IRole): void {
    const index = this.roles.map(r=>r.name).indexOf(role.name);

    if (index >= 0) {
      console.log('roles', this.roles)
      this.roles.splice(index, 1);
    }
  }
 
  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push({name: event.option.viewValue});
    this.roleInput.nativeElement.value = '';
    this.rolesFormControl.setValue(null);
  }

  private _filter(value: string): IRole[] {
    const filterValue = value.toUpperCase();

    return this.allRoles.filter(role => role.name.toUpperCase().indexOf(filterValue) === 0);
  }

}

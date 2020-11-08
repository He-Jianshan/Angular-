import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { IUser } from '../type';
import { UserService } from './user.service';

export class ListUserAction {
  static readonly type = "[User] List";
  constructor(){}
}
export class AddUserAction {
  static readonly type = "[User] Add";
  constructor(public user: IUser){}
}
export class UpdateUserAction {
  static readonly type = "[User] Update";
  constructor(public user: IUser){}
}
export class DeleteUserAction {
  static readonly type = "[User] Delete";
  constructor(public user: IUser){}
}
export class UserStateModel {
  users: IUser[]
}

@State<UserStateModel>({
  name: "users",
  defaults: {
    users: []
  }
})
@Injectable()
export class UserStateService {

  constructor(private userService: UserService,
    private store: Store) { }

  @Action(ListUserAction)
  listUserAction(ctx: StateContext<UserStateModel>, action: ListUserAction) {
    this.userService.getUserList().subscribe(
      (users) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          users: users ? users : []
        })
      }
    )
  }
  @Action(AddUserAction)
  addUserAction(ctx: StateContext<UserStateModel>, action: AddUserAction) {
    this.userService.addUser(action.user).subscribe(
      (users) => {
        this.store.dispatch(new ListUserAction());
    })
  }
  @Action(UpdateUserAction)
  updateUserAction(ctx: StateContext<UserStateModel>, action: UpdateUserAction) {
    this.userService.updateUser(action.user).subscribe(
      (users) => {
        this.store.dispatch(new ListUserAction());
    })
  }
  @Action(DeleteUserAction)
  deleteUserAction(ctx: StateContext<UserStateModel>, action: DeleteUserAction) {
    this.userService.deleteUser(action.user).subscribe(
      (users) => {
        this.store.dispatch(new ListUserAction());
    })
  }
}

import { Injectable } from '@angular/core';
import { IRole } from '../type';
import { RoleService } from './role.service';
import { Store, StateContext, State, Action } from '@ngxs/store';


export class ListRoleAction {
  static readonly type = "[Role] List";
  constructor(){}
}
export class AddRoleAction {
  static readonly type = "[Role] Add";
  constructor(public role: IRole){}
}
export class UpdateRoleAction {
  static readonly type = "[Role] Update";
  constructor(public role: IRole){}
}
export class DeleteRoleAction {
  static readonly type = "[Role] Delete";
  constructor(public role: IRole){}
}
export class RoleStateModel {
  roles: IRole[]
}

@State<RoleStateModel>({
  name: "roles",
  defaults: {
    roles: []
  }
})
@Injectable()
export class RoleStateService {

  constructor(private roleService: RoleService,
    private store: Store) { }

  @Action(ListRoleAction)
  listRole(ctx: StateContext<RoleStateModel>, action: ListRoleAction) {
    this.roleService.listRole().subscribe(
      roles => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          roles: roles ? roles : []
        })
      }
    )
  }
  @Action(AddRoleAction)
  updateRole(ctx: StateContext<RoleStateModel>, action: AddRoleAction) {
    this.roleService.addRole(action.role).subscribe(
      r => this.store.dispatch(new ListRoleAction()));
  }
  @Action(UpdateRoleAction)
  addRole(ctx: StateContext<RoleStateModel>, action: UpdateRoleAction) {
    this.roleService.updateRole(action.role).subscribe(
      r => this.store.dispatch(new ListRoleAction()));
  }
  @Action(DeleteRoleAction)
  deleteRole(ctx: StateContext<RoleStateModel>, action: DeleteRoleAction) {
    this.roleService.deleteRole(action.role).subscribe(
      r => this.store.dispatch(new ListRoleAction()));
  }
}

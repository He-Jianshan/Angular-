import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ILoginResult, ILogin } from '../type';
import { AuthService } from './auth.service';

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public login: ILogin) {}
}
export class LogoutAction {
  static readonly type = '[Auth] Logout';
  constructor() {}
}

@State<ILoginResult>({
  name: 'auth',
  defaults: null
})
@Injectable()
export class MyState {
  constructor(private authService: AuthService) {}

  @Action(LoginAction)
  login(ctx: StateContext<ILoginResult>, action: LoginAction) {
    return this.authService.login(action.login).pipe(
      tap(loginResult => {
        const state = ctx.getState();
        ctx.setState({
          ...state, 
          message: loginResult.message,
          token: loginResult.token,
          status: loginResult.status
        });
      })
    );
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<ILoginResult>, action: LogoutAction) {
    return this.authService.logout().pipe(
      tap(response => {
        const state = ctx.getState();
        ctx.setState({
          ...state, message:"logout", token:null, status:"logout"
        })
      })
    )
  }
}
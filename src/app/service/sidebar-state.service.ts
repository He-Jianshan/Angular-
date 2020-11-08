import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';


export class OpenAction {
  static readonly type = '[Sidbar] Open';
  constructor() {}
}
export class CloseAction {
  static readonly type = '[Sidebar] Close';
  constructor() {}
}
export class ToggleAction {
  static readonly type = '[Sidebar] Toggle';
  constructor() {}
}

export class SidebarModel {
  opened: boolean;
}

@State<SidebarModel>({
  name: 'sidebar',
  defaults: {
    opened: true
  }
})

@Injectable()
export class SidebarStateService {
  constructor() {}

  @Action(OpenAction)
  open(ctx: StateContext<SidebarModel>, action: OpenAction) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: true
    })
    
  }

  @Action(CloseAction)
  close(ctx: StateContext<SidebarModel>, action: CloseAction) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: false
    })
  }

  @Action(ToggleAction)
  toggle(ctx: StateContext<SidebarModel>, action: ToggleAction) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: !state.opened
    })
  }
}
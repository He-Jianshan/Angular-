import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { BannerComponent } from './banner/banner.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IoMaterialModule } from './material.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; 
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingHttpClientInterceptor } from './service/http.interceptor';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { MyState } from './service/mystate.service';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { RoleFormComponent } from './form/role-form/role-form.component';
import { UserFormComponent } from './form/user-form/user-form.component';
import { SidebarStateService } from './service/sidebar-state.service';
import { Routes, RouterModule } from "@angular/router";
import { UserStateService } from './service/user-state.service';
import { RoleStateService } from './service/role-state.service';

const routes: Routes = [
  {path: 'user', component: UserComponent },
  {path: 'role', component: RoleComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    BannerComponent,
    MainComponent,
    LoginComponent,
    UserComponent,
    RoleComponent,
    RoleFormComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([MyState, SidebarStateService,
      UserStateService, RoleStateService], {
      developmentMode: !environment.production
    }),
    RouterModule.forRoot(routes),
 
    IoMaterialModule,
  ],
  entryComponents: [
    LoginComponent,
    RoleFormComponent,
    UserFormComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    LoadingHttpClientInterceptor
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }

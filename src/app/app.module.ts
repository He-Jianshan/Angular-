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

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    BannerComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([MyState], {
      developmentMode: !environment.production
    }),
 
    IoMaterialModule,
  ],
  entryComponents: [
    LoginComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    LoadingHttpClientInterceptor
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }

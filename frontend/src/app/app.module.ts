import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginSignupService } from './core/login-signup/login-signup.service';
import { HttpInterceptorService } from './core/api/http-interceptor.service';
import { LoginSignupDataService } from './core/login-signup/login-signup-data.service';
import { ToasterServiceService } from './core/api/toaster-service.service';
import { MaterialModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToasterModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    LoginSignupService,
    LoginSignupDataService,
    ToasterServiceService,
    HttpInterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginSignupDataService } from './login-signup-data.service';

@Injectable()
export class LoginSignupService {

  constructor(
        private loginSignupDataService: LoginSignupDataService
  ) { }

  signup = (payload) => {
    return this.loginSignupDataService.signup(payload);
  }

  login = (payload) => {
    return this.loginSignupDataService.login(payload);
  }

  saveCredentials = (payload) => {
    return this.loginSignupDataService.saveCredentials(payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptorService } from './../api/http-interceptor.service';

@Injectable()
export class LoginSignupDataService {

  constructor(
    private http: HttpInterceptorService
  ) { }

  signup = (payload) => {
    return this.http.post('register_user', payload)
                    .map(data => data.json());
  }

  login = (payload) => {
    return this.http.post("login", payload)
                    .map(data => data.json());
  }

  saveCredentials = (payload) => {
    return this.http.post("save_credentials", payload)
                    .map(data => data.json());
  }
} 

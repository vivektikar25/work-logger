import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Injectable()
export class HttpInterceptorService extends Http {
  constructor(backend: XHRBackend, options: RequestOptions, public router: Router) {
    super(backend, options);
  }

  request(url: Request | string , options?: RequestOptionsArgs): Observable<Response> { //url is object and not string
    let authToken = "";
    const baseUrl = environment.baseUrl;
    authToken = localStorage.getItem(authToken);
    if (typeof url === 'string') {
      url = `${baseUrl}${url}`; 
      if (!options) {
        options = { headers: new Headers()};
      }
      options.headers.set("Content-Type", "application/json");
      options.headers.set("Authorization", authToken);
    }else{
      url.url = `${baseUrl}${url.url}`; 
      url.headers.set("Content-Type", "application/json");
      url.headers.set("Authorization", authToken);
    }
    return super.request(url, options).catch(this.handleError(this));
  }

  private handleError(self: HttpInterceptorService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response): any => {
      if (res.status === 401) {
        self.router.navigate(['/login']);
      }
      console.error(res);
      return Observable.throw(res);
    };
  }
}

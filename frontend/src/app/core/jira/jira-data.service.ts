import { Injectable } from '@angular/core';
import { HttpInterceptorService } from './../api/http-interceptor.service';

@Injectable()
export class JiraDataService {

  constructor(
    private http: HttpInterceptorService
  ) { }
  getJiraTickets = (payload) => {
    return this.http.post("get_tickets", payload)
                    .map(data => data.json());
  }
}

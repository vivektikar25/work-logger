import { Injectable } from '@angular/core';
import { HttpInterceptorService } from './../../core/api/http-interceptor.service';

@Injectable()
export class WorkLogDataService {

  constructor(
    private http: HttpInterceptorService
  ) { }

  addWorkLog = (payload) => {
    return this.http.put('save_work_log', payload)
                    .map(data => data.json());
  }
}

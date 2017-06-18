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

  getUsersWorkLogs = () => {
    const currentDate = this.getCurrentDate();
    return this.http.get(`save_work_log?date=${currentDate}`)
                    .map(data => data.json());
  } 

  pushToSlack = (payload) => {
    return this.http.post("slack_log_work", payload)
                    .map(data => data.json());
  }

  pushToJira = (payload) => {
    return this.http.post("jira_log_work", payload)
                    .map(data => data.json());
  }

  getCurrentDate = () => {
    let date = new Date(Date()),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    
  }  
}

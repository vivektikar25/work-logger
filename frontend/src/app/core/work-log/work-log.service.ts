import { Injectable } from '@angular/core';
import { WorkLogDataService } from './work-log-data.service';

@Injectable()
export class WorkLogService {

  constructor(
    private workLogDataService: WorkLogDataService
  ) { }

  addWorkLog = (payload) => {
    return this.workLogDataService.addWorkLog(payload);
  }

  getUsersWorkLogs = () => {
    return this.workLogDataService.getUsersWorkLogs();
  }
}

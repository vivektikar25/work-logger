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

  modifyWorkLogList = (workLogs) => {
    let modifiedWorkLogs = workLogs.map(workLog => {
      workLog.fields.updateSlack = false;
      workLog.fields.updateJira = false;
      return workLog;
    });
    return modifiedWorkLogs;
  }

  getSlacksSelectedWorkLogIds = (workLogs) => {
    
    const workLogIdList =  workLogs.filter( workLog => workLog.fields.updateSlack);
    const mappedWorkLogIdList =  workLogIdList.map( workLog => workLog.pk);
    return mappedWorkLogIdList; 
  }

  pushToSlack = (payload) => {
    return this.workLogDataService.pushToSlack(payload);
  };

  getJirasSelectedWorkLogIds = (workLogs) => {
    
    const workLogIdList =  workLogs.filter( workLog => workLog.fields.updateJira);
    const mappedWorkLogIdList =  workLogIdList.map( workLog => workLog.pk);
    return mappedWorkLogIdList; 
  }

  pushToJira = (payload) => {
    return this.workLogDataService.pushToJira(payload);
  };
}

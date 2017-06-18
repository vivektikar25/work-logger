import { Component, OnInit } from '@angular/core';
import { WorkLogService } from './../core/work-log/work-log.service';

@Component({
  selector: 'app-worklog-board',
  templateUrl: './worklog-board.component.html',
  styleUrls: ['./worklog-board.component.css']
})
export class WorklogBoardComponent implements OnInit {
  workLogs;
  selectedWorkLog;

  constructor(
    private workLogService: WorkLogService
  ) { }

  ngOnInit() {
    this.getUsersWorkLogs();
  }

  getUsersWorkLogs = () => {
    this.workLogService.getUsersWorkLogs().subscribe(
      data => {
        this.workLogs = this.workLogService.modifyWorkLogList(data);
        this.selectedWorkLog = data[0];
      },
      err => {

      }
    )
  }

  getWorkLogDetails = (workLog) => {
    this.selectedWorkLog = workLog;
  }

  addWorkLogSlack = () => {
    const workLogIds = this.workLogService.getSlacksSelectedWorkLogIds(this.workLogs);
    console.log(workLogIds);
    const payload = {
      "work_log_ids": workLogIds
    }
    this.workLogService.pushToSlack(payload).subscribe(
      data => {
        console.log("Slack updated successfully", data);
        this.getUsersWorkLogs();
      },
      err => {
        console.log("Failed to update slack", err);
      });
  }

  addWorkLogJira = () => {
    const workLogIds = this.workLogService.getJirasSelectedWorkLogIds(this.workLogs);
    console.log(workLogIds);
    const payload = {
      "work_log_ids": workLogIds
    }
    this.workLogService.pushToJira(payload).subscribe(
      data => {
        console.log("Slack updated successfully", data);
        this.getUsersWorkLogs();
      },
      err => {
        console.log("Failed to update slack", err);
      });
  }
}

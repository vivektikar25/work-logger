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
        this.workLogs = data;
        this.selectedWorkLog = data[0];
      },
      err => {

      }
    )
  }

  getWorkLogDetails = (workLog) => {
    this.selectedWorkLog = workLog;
  }

}

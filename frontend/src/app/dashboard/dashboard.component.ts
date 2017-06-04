import { Component, OnInit } from '@angular/core';
import { JiraService } from './../core/jira/jira.service';
import { WorkLogService } from './../core/work-log/work-log.service';
import { ToasterServiceService } from './../core/api/toaster-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tickets: any[];
  numberOfTickets: number[] = [];
  maxTickets: number;
  model;
  projects: string[];
  selectedProjects: string[];
  assignee: string;
  selectedTicket = {};
  comment: string;
  timespent: string;

  constructor(
    private jiraService: JiraService,
    private workLogService: WorkLogService,
    private toasterServiceService: ToasterServiceService
  ) { }

  ngOnInit() {
    for(let i=1; i<= 10; i++){
      this.numberOfTickets.push(i);
    }
    this.projects = ["SMP", "SR", "OHP"];
    
  }

  getJiraTickets = () => {
    console.log("selectedProjects are", typeof(this.selectedProjects));
    const payload = {
      "assignee": this.assignee,
      "project": this.selectedProjects,
      "max_ticket_limit": Number(this.maxTickets)
    };
    this.jiraService.getJiraTickets(payload).subscribe(
      data => {
        console.log("data is", data);
        this.tickets = data;
        this.selectedTicket = this.tickets[0];
      },
      err => {
        
      }
    );
  }

  selectTicket = (ticket) => {
    this.selectedTicket = ticket;
  }

  addWorkLog = () => {
    const payload = {
      "jira_ticket": this.selectedTicket["ticket_number"],
      "comment": this.comment,
      "time_spent": this.timespent
    }

    this.workLogService.addWorkLog(payload).subscribe(
      data => {
        if(data.save_work_log_status){
          this.toasterServiceService.showToaster("success", "Add Work Log", data.message);
        }else{
          this.toasterServiceService.showToaster("warning", "Add Work Log", data.message);
        }
      },
      err => {
        this.toasterServiceService.showToaster("warning", "Add Work Log", "Failed to save work log");
      }
    );
  }
}

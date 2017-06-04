import { Component, OnInit } from '@angular/core';
import { JiraService } from './../core/jira/jira.service';

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

  constructor(
    private jiraService: JiraService
  ) { }

  ngOnInit() {
    for(let i=1; i<= 10; i++){
      this.numberOfTickets.push(i);
    }
    this.projects = ["SMP", "SR", "OHP"];
    
  }

  getJiraTickets = () => {
    this.selectedProjects.push("");
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
      },
      err => {
        
      }
    );
  }



}

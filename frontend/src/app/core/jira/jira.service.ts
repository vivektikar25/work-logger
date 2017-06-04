import { Injectable } from '@angular/core';
import { JiraDataService } from './jira-data.service';

@Injectable()
export class JiraService {

  constructor(
    private jiraDataService: JiraDataService
  ) { }

  getJiraTickets = (payload) => {
    return this.jiraDataService.getJiraTickets(payload);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from './../core/login-signup/login-signup.service';

@Component({
  selector: 'app-store-credentials',
  templateUrl: './store-credentials.component.html',
  styleUrls: ['./store-credentials.component.sass']
})
export class StoreCredentialsComponent implements OnInit {
  jiraUsername: string;
  jiraPassword: string;
  slackToken: string;

  constructor(private loginSignupService: LoginSignupService) { }

  ngOnInit() {
  }

  saveCredentials = () => {
    let payload = {
      "jira_username": this.jiraUsername,
      "jira_password": this.jiraPassword,
      "slack_token": this.slackToken
    }
    this.loginSignupService.saveCredentials(payload).subscribe(
      data => {
        console.log("Credentials saved successfully");
      },
      err => {
        console.log("Failed to save credentials");
      }
    );
  };
}

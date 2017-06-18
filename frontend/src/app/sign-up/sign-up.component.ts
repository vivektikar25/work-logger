import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from './../core/login-signup/login-signup.service';
import { ToasterServiceService } from './../core/api/toaster-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  teams: any[] = [];
  selectedTeam: string;
  email: string;
  password: string;

  constructor(
    private loginSignupService: LoginSignupService,
    private toasterService: ToasterServiceService,
    private router: Router
    ) { }

  ngOnInit() {
    this.teams = ["Development", "QA", "Support", "Design"];
    this.selectedTeam = this.teams[0];
  }

  signup = () => {
    const payload = {
      "email": this.email,
      "password": this.password,
      "department": this.selectedTeam
    }  
    this.loginSignupService.signup(payload).subscribe(
      data => {
        if(data["register_user_status"]){
          this.toasterService.showToaster("success", "sign up", data["message"]);
          this.router.navigate(['/login']);
        }else{
          this.toasterService.showToaster("warning", "sign up", data["message"]);
        }  
      },
      err => {
         this.toasterService.showToaster("warning", "sign up", err);
      });
  }
}

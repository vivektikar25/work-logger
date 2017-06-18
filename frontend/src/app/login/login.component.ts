import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from './../core/login-signup/login-signup.service';
import { ToasterServiceService } from './../core/api/toaster-service.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private loginSignupService: LoginSignupService,
    private toasterService: ToasterServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login = () => {
    const payload = {
      "email": this.email,
	    "password": this.password
    }

    this.loginSignupService.login(payload).subscribe(
      data => {
        if(data["status"]){
          localStorage.setItem("authToken", data["token"]);
          this.router.navigate(['/dashboard']);
        }else{
          this.toasterService.showToaster("warning", "Login", data["message"]);
        }
      },
      err => {
         this.toasterService.showToaster("warning", "Login", err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.user.email, this.user.password).subscribe(result => {
      // Subscription check
      if (result.subscription === false) {
        this.route.navigateByUrl("/payment-pending");
      } else {
        this.route.navigateByUrl("/dashboard");
      }
    })
  }

  register(){
    this.route.navigateByUrl("/register")
  }

}

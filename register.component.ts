import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any = {
    username: "",
    password: "",
    email: "",
    fullName: "",
    avatar: ""
  };

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register({ user: this.user}).subscribe(result => {
      if (result) {
        this.route.navigateByUrl("/login");
      } else {

      }
    })
  }

  login(){
    this.route.navigateByUrl("/login");
  }

}

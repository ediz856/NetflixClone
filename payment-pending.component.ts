import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.scss']
})
export class PaymentPendingComponent implements OnInit {
  currentUser: any;
  card: any = {
    number: "",
    ex: "",
    cvc: ""
  };
  constructor(private notificationsService: ToastrService, private route: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }


  payNow(){
    localStorage.setItem("card", JSON.stringify(this.card));
    setTimeout(() => {
      this.notificationsService.success(
        "Success",
        "Your payment has been successfully received"
      );
    }, 1000);
    setTimeout(() => {
      this.route.navigateByUrl("/dashboard");
    }, 3000);
  }

}

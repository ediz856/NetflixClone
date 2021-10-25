import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";

import { SettingsService } from "../services/settings.service";
import { HttpCaller } from "../common/http-caller";

//models
import { HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class UserService {
  public token: string;
  constructor(
    private notificationsService: ToastrService,
    private settingsService: SettingsService,
    private router: Router,
    private httpCaller: HttpCaller
  ) {
    var currentUser = JSON.parse(localStorage.getItem("user"));
    this.token = currentUser && currentUser.token;
  }

  addToMyList(user_id: string, movie: any): Observable<any> {
    return this.httpCaller
      .post(
        this.settingsService.data.addToMyList,
        null,
        { user: { user: user_id, movie: movie } }
      )
      .map((response: Response) => {
        var data = response as any;
        this.notificationsService.error("Movie added into your list successfully");
      });
  }


  getAllMovies(): Observable<any[]> {
    return this.httpCaller
      .get(this.settingsService.data.getAllMovies, null)
      .map((response: Response) => {
        return response as any;
      });
  }

  // isAuthenticated(isGuard = false) {
  //   var currentUser = localStorage.getItem("user");
  //   if (currentUser) {
  //     if (JSON.parse(currentUser).token) {
  //       return true;
  //     } else {
  //       if (this.token && !isGuard && window.location.pathname != "/login") {
  //         if (window.location.pathname && window.location.pathname != "/") {
  //           this.router.navigate(["/login"], {
  //             queryParams: { returnUrl: window.location.pathname }
  //           });
  //         } else {
  //           this.router.navigateByUrl("/login");
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // // register(customer: CustomerModel): Observable<AdminModel[]> {
  // //   let params = new HttpParams().append("CustomerID", customer.CustomerID);
  // //   return this.httpCaller
  // //     .get(this.settingsService.data.LoginApiUrl, params)
  // //     .map((response: Response) => {
  // //       return response as any;
  // //     });
  // // }

  // regiser(userData: any): Observable<any> {
  //   return this.httpCaller
  //     .post(
  //       this.settingsService.data.RegisterUrl,
  //       null,
  //       userData,
  //       true,
  //       "There was an error while submitting your update"
  //     )
  //     .map((response: Response) => {
  //       this.notificationsService.success(
  //         "Success",
  //         "...."
  //       );
  //       return response as any;
  //     });
  // }

  // logout(): boolean {
  //   // clear token remove user from local storage to log user out
  //   this.token = null;
  //   localStorage.removeItem("user");
  //   return true;
  // }

}

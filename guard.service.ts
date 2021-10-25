import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class GuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate() {
    if (this.authService.isAuthenticated(true)) {
      return true;
    } else {
      if (window.location.pathname && window.location.pathname != "/") {
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: window.location.pathname }
        });
      } else {
        this.router.navigateByUrl("/login");
      }
      return false;
    }
  }
}

// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service"
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (localStorage.getItem('user')) {
      const currentUser = localStorage.getItem('user');

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ` + JSON.parse(currentUser).token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }


    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.logout(); //clear the token and continue
          window.location.replace("/login?returnUrl=" + window.location.pathname);
        }
      }
    });
  }
}

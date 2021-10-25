import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/finally";
import { Response, RequestOptionsArgs } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/internal/operators/catchError";
import { CustomEncoder } from "../common/CustomEncoder";
import * as $ from "jquery";

@Injectable({
  providedIn: "root"
})
export class HttpCaller {
  isLoaderShown: boolean = false;

  baseUrl = environment.apiBaseURL;

  constructor(
    private http: HttpClient,
    private notificationsService: ToastrService
  ) {}
  //send params as shown in below commented code
  //let Params = = new HttpParams().append('firstParameter', "test").append('secondParameter', "test2");

  post(
    url: string,
    params?: HttpParams,
    body?: any,
    hasLoading: boolean = true,
    errorMessage: string = ""
  ): Observable<Response> {
    if (hasLoading) {
      this.showLoader();
    }

    if (params) {
      params = new HttpParams({
        encoder: new CustomEncoder(),
        fromString: params.toString()
      });
    }

    return this.http
      .post<Response>(this.baseUrl + url, body, { params: params })
      .pipe(catchError(err => this.handleError(err)))
      .finally(() => this.hideLoader());
  }

  delete(
    url: string,
    params?: HttpParams,
    body?: any,
    hasLoading: boolean = true,
    errorMessage: string = ""
  ): Observable<Response> {
    if (hasLoading) {
      this.showLoader();
    }

    if (params) {
      params = new HttpParams({
        encoder: new CustomEncoder(),
        fromString: params.toString()
      });
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body,
      params: params
    };

    return this.http
      .delete<Response>(this.baseUrl + url, httpOptions)
      .pipe(catchError(err => this.handleError(err)))
      .finally(() => this.hideLoader());
  }

  get(
    url: string,
    params?: HttpParams,
    hasLoading: boolean = true,
    errorMessage: string = ""
  ): Observable<Response> {
    if (hasLoading) {
      this.showLoader();
    }

    if (params) {
      params = new HttpParams({
        encoder: new CustomEncoder(),
        fromString: params.toString()
      });
    }

    return this.http
      .get<Response>(this.baseUrl + url, { params: params })
      .pipe(catchError(err => this.handleError(err)))
      .finally(() => this.hideLoader());
  }

  private handleError(error: HttpErrorResponse, errorMessage: string = "") {
    var responseError = error.error.Message;
    console.log(error.error);
    if (error.error instanceof ErrorEvent) {
      if (errorMessage != "") {
        this.notificationsService.error(errorMessage, "Error");
      } else {
        this.notificationsService.error(
          "There was an error while processing your request. Please try again laters  ",
          "Error"
        );
      }
    } else {
      if (error.status == 401) {
        this.notificationsService.error("Invalid credentials", "Unauthorized");
        window.location.replace("/login?returnUrl=" + window.location.pathname);
      } else if (error.status == 400 && error.error.length > 0) {
        if (responseError !== undefined) {
          this.notificationsService.error(responseError, "Message", {
            timeOut: 5000
          });
        } else {
          this.notificationsService.error(error.error, "Error");
        }
      } else {
        if (responseError !== undefined) {
          this.notificationsService.error(responseError, "Message", {
            timeOut: 5000
          });
        } else {
          this.notificationsService.error(
            "There was an error while processing your request. Please try again laters",
            "Error"
          );
        }
      }
    }
    this.hideLoader();
    return throwError("Something bad happened; please try again later.");
  }

  private showLoader() {
    $("#loadingScreen").css("display", "block");
  }

  private hideLoader() {
    $("#loadingScreen").css("display", "none");
  }
}

import { Injectable } from "@angular/core";

@Injectable()
export class SettingsModel {
  //User Login
  LoginApiUrl: string;
  RegisterUrl: string;
  getMovie: string;
  getMovieByTagName: string;
  payment: string;
  me: string;
  updateMe: string;
  addToMyList: string;
  getAllMovies: string;
}

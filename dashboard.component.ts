import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  movies: any[] = [];
  mainMovie: any = {
    title: "Avengers Endgame",
    cover: "https://i.ytimg.com/vi/hA6hldpSTF8/maxresdefault.jpg",
    content: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their...",

  };

  constructor(private route: Router, private userService: UserService, private authService: AuthService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.getMainMovie();
  }

  reLoad() {
    this.mainMovie = {
      title: "Avengers Endgame",
      cover: "https://i.ytimg.com/vi/hA6hldpSTF8/maxresdefault.jpg",
      content: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their...",
    };
  }

  getMainMovie() {
    this.getAllMovies();
  }


  getAllMovies() {
    this.userService.getAllMovies().subscribe(result => {
      this.movies = result;
      console.log(result);
    });
  }

  addMyList() {
    console.log(this.mainMovie);
    // this.userService.addToMyList(this.currentUser.user_id, movie).subscribe(result => {
    // });
    if (localStorage.getItem("list") === undefined || localStorage.getItem("list") === null) {
      localStorage.setItem("list", JSON.stringify([this.mainMovie]));
    } else {
      let list = JSON.parse(localStorage.getItem("list"));
      list.push(this.mainMovie);
      localStorage.setItem("list", JSON.stringify(list));
    }
  }

  cardAddMyList(movie: any) {
    console.log(movie);
    if (localStorage.getItem("list") === undefined || localStorage.getItem("list") === null) {
      localStorage.setItem("list", JSON.stringify([movie]));
    } else {
      let list = JSON.parse(localStorage.getItem("list"));
      list.push(movie);
      localStorage.setItem("list", JSON.stringify(list));
    }
  }

  watchNow(movie: any) {
    if (movie.title === "Avengers Endgame") {
      this.route.navigateByUrl("/movie/5ce14578008f8e68163b077f");
    } else {

    }
  }

  logout() {
    if (this.authService.logout()) {
      this.route.navigateByUrl("/login");
    } else {

    }
  }

  show(movie: any) {
    this.mainMovie.title = movie.title;
    this.mainMovie.cover = movie.cover;
    this.mainMovie.content = movie.content;
    window.scrollTo(0, 0);
  }

}

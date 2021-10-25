import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SinglePlayerComponent implements OnInit {
  sources: Array<Object>;
  currentUser: any;
  constructor() {
    this.sources = [
      {
        src: "../../assets/Avengers.mp4",
        type: "video/mp4"
      }
    ];
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }


}

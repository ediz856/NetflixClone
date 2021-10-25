import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser: any;
  card: any;
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.card = JSON.parse(localStorage.getItem("card"));
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  currentUser: any;
  list: any[] = [];
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.list = JSON.parse(localStorage.getItem("list"));
  }

}

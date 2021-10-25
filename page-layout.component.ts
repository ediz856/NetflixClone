import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent {
  constructor(public location: Location, private permissionsService: NgxPermissionsService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    var currentUser = localStorage.getItem('user');
    if (currentUser != null) {
      const perm = [];
      perm.push(JSON.parse(currentUser).roleName);
      this.permissionsService.loadPermissions(perm);
    }
  }
}

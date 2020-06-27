import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss'],
})
export class UserblockComponent implements OnInit {
  user: any;

  public userLogged;

  constructor(public userblockService: UserblockService) {
    this.user = {
      picture: 'assets/img/user/unnamed.png',
    };
  }

  ngOnInit() {
    this.userLogged = this.userblockService.getUserInfo();
  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }
}

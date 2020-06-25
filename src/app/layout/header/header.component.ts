import { AuthenticationService } from './../../core/services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/core/menu/menu.service';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { UserblockService } from '../sidebar/userblock/userblock.service';
const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navCollapsed = true; // for horizontal layout
  menuItems = []; // for horizontal layout

  isNavSearchVisible: boolean;
  @ViewChild('fsbutton') fsbutton; // the fullscreen button

  constructor(
    public menu: MenuService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    public authenticationService: AuthenticationService
  ) {
    // show only a few items on demo
    this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
  }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) {
      // Not supported under IE
      this.fsbutton.nativeElement.style.display = 'none';
    }
  }

  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.toggleLayoutSetting('offsidebarOpen');
  }

  toggleCollapsedSideabar() {
    this.settings.toggleLayoutSetting('isCollapsed');
  }

  isCollapsedText() {
    return this.settings.getLayoutSetting('isCollapsedText');
  }

  toggleFullScreen(event) {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
    // Switch icon indicator
    const el = $(this.fsbutton.nativeElement);
    if (screenfull.isFullscreen) {
      el.children('em').removeClass('fa-expand').addClass('fa-compress');
    } else {
      el.children('em').removeClass('fa-compress').addClass('fa-expand');
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}

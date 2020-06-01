import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { ThemesService } from 'src/app/core/themes/themes.service';
declare var $: any;

@Component({
  selector: 'app-offsidebar',
  templateUrl: './offsidebar.component.html',
  styleUrls: ['./offsidebar.component.scss'],
})
export class OffsidebarComponent implements OnInit, OnDestroy {
  currentTheme: any;
  selectedLanguage: string;
  clickEvent = 'click.offsidebar';
  $doc: any = null;

  constructor(public settings: SettingsService, public themes: ThemesService) {
    this.currentTheme = themes.getDefaultTheme();
    // this.selectedLanguage = this.getLangs()[0].code;
  }

  ngOnInit() {
    this.anyClickClose();
  }

  setTheme() {
    this.themes.setTheme(this.currentTheme);
  }

  getLangs() {
    // return this.translator.getAvailableLanguages();
  }

  setLang(value) {
    // this.translator.useLanguage(value);
  }

  anyClickClose() {
    this.$doc = $(document).on(this.clickEvent, (e) => {
      if (!$(e.target).parents('.offsidebar').length) {
        this.settings.setLayoutSetting('offsidebarOpen', false);
      }
    });
  }

  ngOnDestroy() {
    if (this.$doc) {
      this.$doc.off(this.clickEvent);
    }
  }
}

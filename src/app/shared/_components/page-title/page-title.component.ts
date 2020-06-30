import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() title = '';
  @Input() subTitle = '';

  constructor() {}

  ngOnInit(): void {}
}

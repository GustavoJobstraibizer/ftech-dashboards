import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss'],
})
export class EmptyContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

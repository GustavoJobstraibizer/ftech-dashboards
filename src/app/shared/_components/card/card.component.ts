import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit(): void {}
}

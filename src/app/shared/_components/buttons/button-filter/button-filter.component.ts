import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ft-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent implements OnInit {
  @Output() handleClickEmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleFilter() {
    this.handleClickEmit.emit();
  }
}

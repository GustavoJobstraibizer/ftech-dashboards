import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'ft-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss'],
})
export class EmptyContentComponent implements OnInit, OnChanges {
  @Input() loading = false

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.loading = changes?.loading?.currentValue
  }
}

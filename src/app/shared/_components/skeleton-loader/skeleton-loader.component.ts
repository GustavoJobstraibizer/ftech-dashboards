import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() count = 1;
  @Input() appearance = 'line';
  public objectsToIterate;

  @Input() theme: ISkeletonTheme[];

  constructor() {}

  ngOnInit() {
    this.objectsToIterate = Array(this.count)
      .fill(1)
      .map((x, i) => i + 1);
  }
}

export interface ISkeletonTheme {
  width: string;
}

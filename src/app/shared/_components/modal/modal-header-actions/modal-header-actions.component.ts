import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ft-modal-header-actions',
  templateUrl: './modal-header-actions.component.html',
  styleUrls: ['./modal-header-actions.component.scss'],
})
export class ModalHeaderActionsComponent implements OnInit {
  @Input() modalId = ''
  @Output() modalCloseEmit = new EventEmitter()

  public maximized = false

  constructor() {}

  ngOnInit(): void {}

  maximize() {
    const modal = document.querySelector(this.modalId)
    modal.classList.toggle('modal-maximize')
  }
}

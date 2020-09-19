import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'ft-modal-periodo',
  templateUrl: './modal-periodo.component.html',
  styleUrls: ['./modal-periodo.component.scss'],
})
export class ModalPeriodoComponent implements OnInit {
  public title = ''

  constructor(
    public bsModalRef: BsModalRef,
    public modalService: BsModalService
  ) {}

  @Output() filtersApplied = new EventEmitter()

  ngOnInit(): void {}

  filtroPeriodo(filter) {
    this.modalService.setDismissReason(JSON.stringify(filter))
    // this.modalService.hide(1);
    this.bsModalRef.hide()
  }

  closeModal() {
    this.bsModalRef.hide()
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { take } from 'rxjs/operators'
import { ModalPeriodoComponent } from './../../filter/modal-periodo/modal-periodo.component'

@Component({
  selector: 'ft-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent implements OnInit {
  @Output() handleClickEmit = new EventEmitter()

  public bsModalRef: BsModalRef
  @Input() titleModalFilter = ''
  @Input() getTodayDate = false

  @Output() filteredValueEmit = new EventEmitter()

  constructor(public modalService: BsModalService) {}

  ngOnInit(): void {}

  handleFilter() {
    this.handleClickEmit.emit()
  }

  openModalFiltros() {
    const initialState = {
      title: this.titleModalFilter,
      getTodayDate: this.getTodayDate,
    }
    this.bsModalRef = this.modalService.show(ModalPeriodoComponent, {
      initialState,
      class: 'modal-dialog-centered modal-filter',
    })

    this.modalService.onHidden.pipe(take(1)).subscribe((data) => {
      if (data && data !== 'backdrop-click') {
        console.log(data)
        localStorage.setItem('currentFilter', data)
        this.filteredValueEmit.emit(JSON.parse(data))
      }
    })
  }
}

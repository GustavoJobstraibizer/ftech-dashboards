import { ModalPeriodoComponent } from './../../filter/modal-periodo/modal-periodo.component';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ft-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent implements OnInit {
  @Output() handleClickEmit = new EventEmitter();

  public bsModalRef: BsModalRef;
  @Input() titleModalFilter = '';

  @Output() filteredValueEmit = new EventEmitter();

  constructor(public modalService: BsModalService) {}

  ngOnInit(): void {}

  handleFilter() {
    this.handleClickEmit.emit();
  }

  openModalFiltros() {
    const initialState = {
      title: this.titleModalFilter,
    };
    this.bsModalRef = this.modalService.show(ModalPeriodoComponent, {
      initialState,
      class: 'modal-filter',
    });

    this.modalService.onHidden.pipe(take(1)).subscribe((data) => {
      if (data && data !== 'backdrop-click') {
        // this.periodo = JSON.parse(data);
        // this.getVendasPorHora();
        this.filteredValueEmit.emit(JSON.parse(data));
      }
    });
  }
}

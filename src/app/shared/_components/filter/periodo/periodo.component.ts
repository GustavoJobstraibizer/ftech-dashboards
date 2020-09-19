import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import * as moment from 'moment/moment'
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface'
import { IPeriodoBusca } from './../../../interfaces/periodo-busca.interface'
defineLocale('pt-br', ptBrLocale)

@Component({
  selector: 'ft-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
})
export class PeriodoComponent implements OnInit {
  @Output() periodoFilterEmit = new EventEmitter()
  @Output() periodoFilterOnInitEmit = new EventEmitter()
  @Input() getTodayDate = false

  public formPeriodo: FormGroup
  public items: IListaFranqueadoPerfil[]
  public submitted = false

  public currentFilter = JSON.parse(
    localStorage.getItem('currentFilter')
  ) as IPeriodoBusca

  constructor(private localeService: BsLocaleService) {
    this.formPeriodo = new FormGroup({
      dataInicio: new FormControl(
        moment(new Date()).subtract(1, 'M').format('DD/MM/YYYY'),
        [Validators.required]
      ),
      dataFim: new FormControl(moment(new Date()).format('DD/MM/YYYY'), [
        Validators.required,
      ]),
      codigoFranqueado: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.localeService.use('pt-br')

    if (this.currentFilter) {
      this.formPeriodo
        .get('dataInicio')
        .setValue(
          moment(this.currentFilter.dataInicio, 'MM/DD/YYYY').format(
            'DD/MM/YYYY'
          )
        )
      this.formPeriodo
        .get('dataFim')
        .setValue(
          moment(this.currentFilter.dataFim, 'MM/DD/YYYY').format('DD/MM/YYYY')
        )
      return
    }

    const dataInicio = this.getTodayDate
      ? moment(new Date()).format('DD/MM/YYYY')
      : moment(new Date()).subtract(1, 'M').format('DD/MM/YYYY')
    this.formPeriodo.get('dataInicio').setValue(dataInicio)
  }

  handleFilter() {
    this.submitted = true
    if (!this.formPeriodo.valid) {
      return
    }

    this.submitted = false

    this.periodoFilterEmit.emit(this.formValueFilter())
  }

  formValueFilter() {
    const { dataInicio, dataFim, codigoFranqueado } = this.formPeriodo.value
    return {
      dataInicio: moment(dataInicio, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      dataFim: moment(dataFim, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      codigoFranqueado,
    }
  }

  codigoFranqueadoEmit() {
    this.periodoFilterOnInitEmit.emit(this.formValueFilter())
  }

  isFieldValid(field: string) {
    return !this.formPeriodo.get(field).valid && this.submitted
  }
}

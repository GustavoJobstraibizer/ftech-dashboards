import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms'
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface'
import { AdministracaoService } from './../../../../core/services/administracao.service'
import { HelperService } from './../../../../core/services/helper.service'

@Component({
  selector: 'ft-combo-franquias',
  templateUrl: './combo-franquias.component.html',
  styleUrls: ['./combo-franquias.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ComboFranquiasComponent,
      multi: true,
    },
  ],
})
export class ComboFranquiasComponent extends SelectControlValueAccessor
  implements OnInit, AfterViewInit {
  private innerValue: any
  public items: IListaFranqueadoPerfil[]

  @Output() handleChangeEmit = new EventEmitter()

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    public admService: AdministracaoService,
    private _helperService: HelperService
  ) {
    super(_renderer, _elementRef)
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.admService.getListaFranqueado().subscribe((response) => {
      this.items = response['Data']

      const currentUser = this._helperService.getUserInfo()

      if (this.items.length === 1) {
        this.value = response['Data'][0].codigo
        this.handleChangeEmit.emit(response['Data'][0])

        if (currentUser) {
          localStorage.setItem(
            'unity',
            JSON.stringify({
              usuario: currentUser.CodigoUsuario,
              franqueado: response['Data'][0],
            })
          )
        }
      } else {
        this.items.unshift({
          auxiliar: null,
          codigo: -1,
          descricao: 'TODOS',
          valor: 0,
        })

        const unidade = localStorage.getItem('unity')
          ? JSON.parse(localStorage.getItem('unity'))
          : null

        if (this.checkUnityOfSelectedUser(unidade, currentUser)) {
          if (
            this.items.find(
              (item) => item.codigo == unidade?.franqueado?.codigo
            )
          ) {
            this.value = unidade?.franqueado?.codigo
            this.handleChangeEmit.emit(unidade?.franqueado)
          }
        } else {
          localStorage.removeItem('unity')
          this.value = -1
          this.handleChangeEmit.emit({
            auxiliar: null,
            codigo: -1,
            descricao: 'TODOS',
            valor: 0,
          })
        }
      }
    })
  }

  checkUnityOfSelectedUser(unidade, currentUser) {
    return unidade && unidade.usuario == currentUser.CodigoUsuario
  }

  clearItemSelected() {
    localStorage.removeItem('unity')
  }

  handleChangeValue(franquia) {
    const currentUser = this._helperService.getUserInfo()
    localStorage.setItem(
      'unity',
      JSON.stringify({
        usuario: currentUser.CodigoUsuario,
        franqueado: franquia,
      })
    )

    this.handleChangeEmit.emit(franquia)
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value
      this.onChange(value)
    }
  }

  get value() {
    return this.innerValue
  }

  onChange: (_: any) => void
  onTouched: () => void
  compareWith: (o1: any, o2: any) => boolean

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2
  }

  writeValue(v: any): void {
    this.value = v
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn
  }
}

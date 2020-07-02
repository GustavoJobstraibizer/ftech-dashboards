import { AdministracaoService } from './../../../../core/services/administracao.service';
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface';

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
  implements AfterViewInit {
  private innerValue: any;
  public items: IListaFranqueadoPerfil[];
  @Output() handleChangeEmit = new EventEmitter();

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    public admService: AdministracaoService
  ) {
    super(_renderer, _elementRef);
  }

  ngAfterViewInit() {
    this.admService.getListaFranqueado().subscribe((response) => {
      this.items = response['Data'];

      if (this.items.length === 1) {
        this.value = response['Data'][0].codigo;
      }
    });
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value() {
    return this.innerValue;
  }

  onChange: (_: any) => void;
  onTouched: () => void;
  compareWith: (o1: any, o2: any) => boolean;

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }
}

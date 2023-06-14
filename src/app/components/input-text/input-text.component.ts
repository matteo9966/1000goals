import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputTextComponent ,multi:true}],
})
export class InputTextComponent implements ControlValueAccessor {
  private _value = '';
  disabled = false;
  @Input() id: string = Math.random().toString().slice(2, 6);
  @Input() label: string = 'Label';

  onChange = (val: string) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this._value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  set value(val: string) {
    this.onTouched();
    this.onChange(val);
    this._value = val;
  }

  get value() {
    return this._value;
  }
}

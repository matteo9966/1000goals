import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextAreaComponent, multi: true },
  ],
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() id = Math.random().toString().slice(2, 6);
  @Input() label = '';
  @Input() errorLabel:string|null=''

  private _value = '';
  onChange(val: string) {}
  onTouched() {}
  isDisabled = false;

  writeValue(obj: any): void {
    if(obj===null || obj==undefined ) return
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this._value;
  }
}

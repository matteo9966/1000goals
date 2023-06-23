import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextComponent,
      multi: true,
    },
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private _value = '';
  disabled = false;
  @Input() id: string = Math.random().toString().slice(2, 6);
  @Input() label: string = 'Label';
  @Input() errorLabel:string|null="";
  @Input() type: 'password' | 'text' = 'text';
  isPassword = false; //this stays fixed
 
  
  onChange = (val: string) => {};
  onTouched = () => {};
  
  ngOnInit(): void {
    this.isPassword = this.type === 'password';
  }
  writeValue(obj: any): void {
    this.cdr.markForCheck();
    if (obj!==null || obj!==undefined) {
      this.value = obj;
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

  togglePasswordVisibility() {
    if (this.type === 'password') {
      this.type = 'text';
      return;
    }
    if (this.type === 'text') {
      this.type = 'password';
      return;
    }
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

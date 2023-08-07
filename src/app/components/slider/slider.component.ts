import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  _value = 50;
  @Output() valueChange = new EventEmitter<number>();

  @Input() label="";
  @Input() min=1;
  @Input() max=100;

  @Input()
  set value(val: number) {
    console.log(val)
    this._value = val;
    this.valueChange.emit(val);
    console.log('EMITTING')
  }
  get value() {
    return this._value;
  }
}

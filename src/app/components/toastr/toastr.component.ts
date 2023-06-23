import { ChangeDetectionStrategy, Component, Input,HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('appearToastr', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(1000, style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate(500, style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ToastrComponent {
  @Input() message = 'no message';
  @Input() type: 'success' | 'error' = 'success';
  @HostBinding('@appearToastr') get appearToastr(){
    return null
  }
}

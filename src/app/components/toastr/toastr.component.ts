import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  inject,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { ToastrService } from 'src/app/services/toastr.service';
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
export class ToastrComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);
  toastrService = inject(ToastrService);
  show = false;
  @Input() message = 'no message';
  @Input() type: 'success' | 'error' = 'success';
  constructor() {}
  ngOnInit() {
    this.toastrService.showToastr$
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((show) => {
        this.show = show;
      });
  }
  // @HostBinding('@appearToastr') get appearToastr() {
  //   return this.show;
  // }

  get showToastr$(){
    return this.toastrService.showToastr$
  }

}

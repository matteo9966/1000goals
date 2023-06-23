import {
  Directive,
  HostListener,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DestroyRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime,takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[appDebounceClick]',
  standalone: true,
})
export class DebounceClickDirective implements OnInit {
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();
  clickSubject = new Subject<any>();
  @Input() debounceMs = 500;
  @Output() debouncedClick = new EventEmitter();
  constructor() {
    this.destroyRef.onDestroy(()=>{
      this.destroyed.next(null);
      this.destroyed.complete();
    })
  }

  ngOnInit(): void {
    this.clickSubject
      .pipe(takeUntil(this.destroyed), debounceTime(this.debounceMs))
      .subscribe((e) => this.debouncedClick.emit(e));
  }

  @HostListener('click', ['$event']) onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.clickSubject.next(e);
  }
}

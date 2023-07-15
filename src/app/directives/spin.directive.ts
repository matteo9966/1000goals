import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appSpin]',
  standalone: true,
})
export class SpinDirective implements OnDestroy {
  timeoutId: any = null;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnDestroy(): void {
    const element = <HTMLElement>this.elementRef.nativeElement;
    this.renderer.removeClass(element, 'spin');
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  @HostListener('click') onClickHost() {
    const element = <HTMLElement>this.elementRef.nativeElement;
    console.log('spin spiiin')
    this.renderer.addClass(element, 'spin');
  }
}

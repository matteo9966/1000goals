import {
  AfterViewInit,
  Directive,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  inject,
  ElementRef
} from '@angular/core';
@Directive({
  selector: '[appAnimatePie]',
  standalone: true,
})
export class AnimatePieDirective implements  OnInit {
  @Input() animationDuration = 1;
  @Input() percentage = 0;
  @HostBinding('style.--p') stylePercentage!: number;
  @HostBinding('style.--c') color!: any;
  private animatedPercentage = 0; //the state of the animation
  private percentageAnimationSplit = 0; //result from the computation to evenly split the total percentage in slices for the animation
  private reqFrameID: number | null = null;
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef)
  constructor() {}
  ngOnInit(): void {
    this.calculateSplits();
    this.repeatAnimation();
  }


  private calculateSplits() {
    if (this.animationDuration <= 0) {
      this.percentageAnimationSplit = this.percentage;
      return;
    }
    const split = this.percentage / (60 * this.animationDuration);
    this.percentageAnimationSplit = split;
  }

  private repeatAnimation() {
    this.animatedPercentage += this.percentageAnimationSplit;
    this.changePercentage(Math.round(this.animatedPercentage))
    if (this.animatedPercentage >= this.percentage && this.reqFrameID) {
      cancelAnimationFrame(this.reqFrameID);
      return;
    }
    this.reqFrameID = requestAnimationFrame(this.repeatAnimation.bind(this));
  }

  changePercentage(value:number){
    this.renderer.setStyle(this.elementRef.nativeElement,'--p',value,2);
  }
}

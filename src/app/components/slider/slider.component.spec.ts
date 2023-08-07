import { SliderComponent } from './slider.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SliderComponent,FormsModule],
    });

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });
  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should set the min and max values of the range input', () => {
    component.min = 1;
    component.max = 200;
    fixture.detectChanges();
    const rangeInput = debugElement.query(By.css('input[type="range"]'));
    expect(rangeInput).toBeDefined();
    const min = rangeInput.nativeElement.getAttribute('min');
    const max = rangeInput.nativeElement.getAttribute('max');
    expect(min).toEqual('1');
    expect(max).toEqual('200');
  });

  it('should set the value on value change',fakeAsync(()=>{
    fixture.detectChanges(); 
    const rangeInput = debugElement.query(By.css('input[type="range"]'));
    expect(rangeInput).toBeTruthy();
    rangeInput.nativeElement.value=82;
    rangeInput.nativeElement.dispatchEvent(new Event('input'))
    flush();
    fixture.detectChanges();
    const pointsSpan = debugElement.query(By.css('.points'));
    expect(pointsSpan).toBeTruthy();
    expect(pointsSpan.nativeElement.innerHTML).toBe('82');
  }))
  it('should emit an event on value change (dispatchEvent)',fakeAsync(()=>{
    fixture.detectChanges(); 
    let  inputVal:any;
    component.valueChange.subscribe(value=>{
      inputVal=value;
    })
    const rangeInput = debugElement.query(By.css('input[type="range"]'));
    rangeInput.nativeElement.value=19
    rangeInput.nativeElement.dispatchEvent(new Event('input'))
    flush();
    fixture.detectChanges();
    expect(inputVal).toEqual(19)
  }))
});

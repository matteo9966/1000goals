import { TestBed } from '@angular/core/testing';
import { ToastrComponent } from './toastr.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
describe('ToastrComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [ToastrComponent],
      providers: [provideNoopAnimations()],
    });

    const fixture = TestBed.createComponent(ToastrComponent);
    const debugElement = fixture.debugElement;
    const component = fixture.componentInstance;
    return { fixture, debugElement, component };
  }

  it('should be defined', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should display the message',()=>{
    const {component,fixture,debugElement} = setup();
    const message = 'the message';
    component.message=message;
    fixture.detectChanges();
    const messageSpan = debugElement.query(By.css('.toastr'))
    expect(messageSpan).toBeTruthy();
    const innerHtml = messageSpan.nativeElement.innerHTML;
    expect(innerHtml).toEqual(message);
  })

  it('should have a default state of success if no initial state is set',()=>{
    const {component,fixture,debugElement} = setup();
    fixture.detectChanges();
    const element = debugElement.query(By.css('.success'));
    expect(element).toBeTruthy();
  })


});

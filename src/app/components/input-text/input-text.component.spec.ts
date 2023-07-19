import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';
import { DebugElement } from '@angular/core';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputTextComponent],
    });

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the eye if it is of type password', () => {
    component.type = 'password';
    fixture.detectChanges();
    let eye = debugElement.query(By.css('.eye-container'));
    expect(eye).toBeTruthy();
  });

  it('should hide the eye if it is of type text', () => {
    component.type = 'text';
    fixture.detectChanges();
    let eye = debugElement.query(By.css('.eye-container'));
    expect(eye).toBeFalsy();
  });

  it('call the changeFunction passed to registerOnChange when i update the value', () => {
    let spy = jasmine.createSpy('changeFunction');
    component.registerOnChange(spy);
    component.value = 'test';
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  
  });

it('should show an errorLabel if it is not null',()=>{
  component.errorLabel = 'test';
  fixture.detectChanges();
  let errorLabel = debugElement.query(By.css('.error-message'));
  expect(errorLabel).toBeTruthy();
})
});

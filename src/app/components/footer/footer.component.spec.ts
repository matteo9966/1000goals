import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//                vvvvv
//TODO: using the async angular  utility?
//                ^^^^^           

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element:DebugElement;

  beforeEach( () => {
     
     TestBed.configureTestingModule({
        imports:[FooterComponent],
    })

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });


  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have a createdBy', () => {
    component.createdBy = 'TestUser';
    fixture.detectChanges();
    const span = element.query(By.css('.created-by'))
    const span2 = element.query(By.css('cb-idea'))
    expect(span).toBeDefined();
    expect(span2).toBeDefined();
    expect((span.nativeElement as HTMLSpanElement).innerText).toBe('Created by TestUser');
  });
});
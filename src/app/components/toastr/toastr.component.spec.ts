import { TestBed } from '@angular/core/testing';
import { ToastrComponent } from './toastr.component';
import {
  NoopAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'src/app/services/toastr.service';
import { BehaviorSubject } from 'rxjs';
describe('ToastrComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [ToastrComponent, NoopAnimationsModule],
      providers: [
        provideAnimations(),
        provideNoopAnimations(),
        {
          provide: ToastrService,
          useValue: {
            showToastr$: new BehaviorSubject(false),
            setSowToastr(show:boolean){
              this.showToastr$.next(show)
            }
          },
        },
      ],
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

  it('should display the message', () => {
    const { component, fixture, debugElement } = setup();
    const message = 'the message';
    component.message = message;
    const toastrService = TestBed.inject(ToastrService);
    toastrService.setSowToastr(true)
    fixture.detectChanges();
    const messageSpan = debugElement.query(By.css('.toastr'));
    expect(messageSpan).toBeTruthy();
    const innerHtml = messageSpan.nativeElement.innerHTML;
    expect(innerHtml).toEqual(message);
  });

  it('should have a default state of success if no initial state is set', () => {
    const { component, fixture, debugElement } = setup();
    const toastrService = TestBed.inject(ToastrService);
    toastrService.setSowToastr(true)
    fixture.detectChanges();
    const element = debugElement.query(By.css('.success'));
    expect(element).toBeTruthy();
  });
});

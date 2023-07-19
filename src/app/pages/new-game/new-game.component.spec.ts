import { TestBed, ComponentFixture,flush,fakeAsync } from '@angular/core/testing';
import { NewGameComponent } from './new-game.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { GameService } from 'src/app/services/game.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('NewGameComponent', () => {
  let fixture: ComponentFixture<NewGameComponent>;
  let debugElement: DebugElement;
  let component: NewGameComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewGameComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            setUserData: jasmine.createSpy(),
          },
        },
        {
          provide: GameService,
          useValue: {
            createGame: jasmine.createSpy().and.returnValue(of({ data: true })),
          },
        },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy() } },
      ],
    });

    fixture = TestBed.createComponent(NewGameComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the value of the name input', fakeAsync(() => {
      fixture.detectChanges();

    const nameInput = debugElement.query(By.css('input#name'));
    nameInput.nativeElement.value = 'test';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    flush();
    fixture.detectChanges();
    expect(nameInput).toBeDefined();
    expect(nameInput.nativeElement.value).toBe('test');
    expect(component.nameControl.value).toBe('test');
  
    
  }));
});

import {
  TestBed,
  ComponentFixture,
  flush,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NewGameComponent } from './new-game.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { GameService } from 'src/app/services/game.service';
import { of,delay } from 'rxjs';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NewGameComponent', () => {
  let fixture: ComponentFixture<NewGameComponent>;
  let debugElement: DebugElement;
  let component: NewGameComponent;
  let navigateByUrlSpy: jasmine.Spy;
  let createGameSpy: jasmine.Spy;
  let setUSerDataSpy:jasmine.Spy;
  beforeEach(() => {
    navigateByUrlSpy = jasmine.createSpy('navigateByUrl');
    createGameSpy = jasmine.createSpy();
    setUSerDataSpy = jasmine.createSpy('setUserDataSpy');
    TestBed.configureTestingModule({
      imports: [NewGameComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            setUserData: setUSerDataSpy,
          },
        },
        {
          provide: GameService,
          useValue: {
            createGame:createGameSpy,
          },
        },
        { provide: Router, useValue: { navigateByUrl: navigateByUrlSpy } },
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

  it('should set the value of the description input', fakeAsync(() => {
    fixture.detectChanges();
    const descriptionInput = debugElement.query(By.css('textarea#description'));
    descriptionInput.nativeElement.value = 'test';
    descriptionInput.nativeElement.dispatchEvent(new Event('input'));
    flush();
    fixture.detectChanges();
    expect(descriptionInput).toBeDefined();
    expect(descriptionInput.nativeElement.value).toBe('test');
    const descriptionControl = component.descriptionControl;
    expect(descriptionControl).toBeDefined();
    const descriptionValue = descriptionControl?.value;
    expect(descriptionValue).toBe('test');
  }));
  it('should show error message when name is empty', fakeAsync(() => {
    fixture.detectChanges();
    const nameInput = debugElement.query(By.css('input#name'));
    nameInput.nativeElement.value = '';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    component.nameControl.markAsTouched();
    component.nameControl.markAsDirty();
    flush();
    fixture.detectChanges();
    const nameErrorLabel = component.nameErrorLabel;
    expect(nameErrorLabel).toBeTruthy();
  }));
  it('should not call createGame if the form is not valid',fakeAsync(()=>{
    fixture.detectChanges();
    const nameInput = debugElement.query(By.css('input#name'));
    nameInput.nativeElement.value = '';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    component.nameControl.markAsTouched();
    component.nameControl.markAsDirty();

    const button = debugElement.query(By.css('button'));
    expect(button).toBeDefined();
    const disabled = button?.nativeElement.disabled;
    expect(disabled).toBeFalse();
    button?.nativeElement.click();
    flush();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTrue();
    expect(createGameSpy).not.toHaveBeenCalled();
  }
  ))
 
  it('should disable the button if the form is submitted',fakeAsync(()=>{
    createGameSpy.and.returnValue(of({data:true}).pipe(delay(1000)));
    const nameInput = debugElement.query(By.css('input#name'));
    nameInput.nativeElement.value = 'valid name for the user';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    component.nameControl.markAsTouched();
    component.nameControl.markAsDirty();
    flush();
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
    const button = debugElement.query(By.css('button'));
    expect(button).toBeDefined();
    const disabled = button?.nativeElement.disabled;
    expect(disabled).toBeFalse();
    button?.nativeElement.click();
    flush();
    fixture.detectChanges();
    expect(createGameSpy).toHaveBeenCalledTimes(1);
    tick(1000);
    expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
    expect(setUSerDataSpy).toHaveBeenCalledWith(true);
    flush();
    expect(component.disabledSubmit).toBeFalse();
  }))

});

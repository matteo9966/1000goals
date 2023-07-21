import {
  TestBed,
  ComponentFixture,
  flush,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { STORAGE, USERDATA_STORAGE_KEY } from 'src/app/app.config';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { LoginResponse } from '1000-goals-types/src/Responses';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let userServiceSpy: jasmine.SpyObj<Partial<UserService>>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let toastrServiceSpy: jasmine.SpyObj<Partial<ToastrService>>;
  let storageSpy: jasmine.SpyObj<Storage>;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let routerSpy: jasmine.SpyObj<Router>;

  function setupValidForm(){
    const nameControl = component.form.get('name');
    const passwordControl = component.form.get('password');
    loginServiceSpy.login.and.returnValue(
      of({ data: true, error: null } as unknown as LoginResponse)
    );
    nameControl!.setValue('test');
    passwordControl!.setValue('password-test');
  }

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('userService', [
      'setUserData',
      'setLoginStatus',
      'getUserData',
    ]);
    loginServiceSpy = jasmine.createSpyObj('loginService', ['login']);
    toastrServiceSpy = jasmine.createSpyObj('toastrService', ['setToastrType','setToastrMessage','setSowToastr']);
    storageSpy = jasmine.createSpyObj('storage', ['setItem']);
    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    (<jasmine.Spy>userServiceSpy!.getUserData!).and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: STORAGE,
          useValue: storageSpy,
        },
        {
          provide: USERDATA_STORAGE_KEY,
          useValue: '',
        },
        {
          provide: LoginService,
          useValue: loginServiceSpy,
        },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //happy path valid name and valid password
  it('setting valid values to form controls should make the form valid', fakeAsync(() => {
    fixture.detectChanges();
    setupValidForm();
    flush();
    fixture.detectChanges();
    const nameValue = component.form.get('name')?.value;
    const passwordValue = component.form.get('password')?.value;
    expect(nameValue).toBe('test');
    expect(passwordValue).toBe('password-test');
    expect(component.form.valid).toBeTruthy();
  }));

  it('should have an enabled login button', () => {
    const loginButton = debugElement.query(By.css('[aria-label="login"]'));
    expect(loginButton).toBeTruthy();
  });

  it('submitting valid form should call login service with the test name and password', fakeAsync(() => {
 
    fixture.detectChanges();
    setupValidForm();

    flush();
    fixture.detectChanges();
    const loginButton = debugElement.query(By.css('[aria-label="login"]'));
    loginButton.nativeElement.click();
    flush();
    fixture.detectChanges();

    expect(loginServiceSpy.login).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'test', password: 'password-test' })
    );
  }));

  it('should disable the button when user clicks Login',fakeAsync(()=>{
    fixture.detectChanges();
    setupValidForm();
    flush();
    fixture.detectChanges();
    const loginButton = debugElement.query(By.css('[aria-label="login"]'));
    loginButton.nativeElement.click();
    tick(500)
    fixture.detectChanges();
    const button = loginButton.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.disabled).toBeTruthy();
    flush();
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  }))


  it('precompiles the input if it recieves password and username as inputs from the queryString',()=>{
    component.passwordFromQueryString='password-from-query-string';
    component.usernameFromQueryString='username-from-query-string';
    fixture.detectChanges();
    expect(component.form.get('name')?.value).toBe('username-from-query-string');
    expect(component.form.get('password')?.value).toBe('password-from-query-string');
  })

  //form validation 
  it('should be invalid form if missing name', () => {
    fixture.detectChanges();
    const nameControl = component.form.get('name');
    nameControl!.setValue('');
    fixture.detectChanges();
    component.onClickLogin();
    expect(component.form.valid).toBeFalsy();
    expect(toastrServiceSpy.setToastrType).toHaveBeenCalledWith('error');
  }
  )

});

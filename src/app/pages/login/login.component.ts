import { Component,Inject,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { ToastrService } from 'src/app/services/toastr.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { tap, finalize } from 'rxjs';
import { STORAGE, USERDATA_STORAGE_KEY } from 'src/app/app.config';

const stringify = (data: Record<any, any>) => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    return null;
  }
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  disabledLogin = false;
  @Input('password') passwordFromQueryString="";
  @Input('username') usernameFromQueryString="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private userService: UserService,
   @Inject(STORAGE) private storage: Storage,
    @Inject(USERDATA_STORAGE_KEY) private userStorageKey:string
  ) {
    
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const pass = this.passwordFromQueryString?this.passwordFromQueryString:"";
    const usernm = this.usernameFromQueryString?this.usernameFromQueryString:"";
    this.form = this.fb.group({
      name: this.fb.control(usernm, [Validators.required]),
      password: this.fb.control(pass, [Validators.required]),
    });
  }



  onClickLogin() {
    if (this.disabledLogin) return;

    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (!this.nameControl?.valid || !this.passwordControl?.valid) {
      this.toastrService.setToastrType('error');
      this.toastrService.setToastrMessage(
        'Missing credentials, provide email and password'
      );
      this.toastrService.setSowToastr(true);
      return
    }
    this.disabledLogin = true;
    this.loginService
      .login({
        name: this.nameControl?.value,
        password: this.passwordControl?.value,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.disabledLogin = false;
            if (this.userService.getUserData()) {
              this.router.navigate(['/'+ROUTES.user.base]);
            }
          }, 1000);
        })
      )
      .subscribe((data) => {
        if (data?.data) {
          this.userService.setUserData(data.data);
          this.userService.setLoginStatus(true);
          const parsedData = stringify(data.data);
          if(parsedData){
            this.storage.setItem(this.userStorageKey, JSON.stringify(data.data));
          }
        }
      });
  }

  onClickBack() {
    this.router.navigateByUrl(ROUTES.home.base);
  }

  get nameControl() {
    return this.form.get('name');
  }
  get passwordControl() {
    return this.form.get('password');
  }
}



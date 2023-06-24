import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ROUTES } from 'src/app/routes/routes';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { Requests } from '1000-goals-types';
import { LoggerService } from 'src/app/services/logger.service';
import { HttpClient } from '@angular/common/http';
import { confirmPasswordValidator } from 'src/app/validators/confirmPassword.validator';
import { ToastrService } from 'src/app/services/toastr.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  private minLengthName = 3;
  private passMinLength = 6;
  disableSignupBtn = false;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private logger: LoggerService,
    private toastrService: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.form
      .get('confirmPassword')
      ?.addValidators([confirmPasswordValidator(this.form)]);
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(this.minLengthName),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(this.passMinLength),
      ]),
      confirmPassword: this.fb.control('', [Validators.required]),
    });
  }

  onClickSignup() {
    if (this.disableSignupBtn) return;
    this.disableSignupBtn = true;
    this.form.updateValueAndValidity();
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (!Object.values(this.form.controls).every((c) => c.valid)) {
      this.toastrService.setToastrMessage(
        'Invalid signup form, complete required fields'
      );
      this.toastrService.setToastrType('error');
      this.toastrService.setSowToastr(true);
      return;
    }
    this.disableSignupBtn = true;
    const signupData: Requests.SignupAdminRequest = {
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value,
    };

    this.signupService
      .signup(signupData)
      .pipe(
        tap({
          complete: () => {
            setTimeout(() => {
              this.disableSignupBtn = false;
            }, 5000);
          },
        })
      )
      .subscribe((response) => {
        if (response && response?.data?.success) {
          this.toastrService.setToastrMessage('Signup success!');
          this.toastrService.setToastrType('success');
          this.toastrService.setSowToastr(true);
          Object.values(this.form.controls).forEach((c) => {
            c.reset();
            c.markAsUntouched();
          });
          this.form.markAsUntouched();
        } else {
          this.toastrService.setToastrMessage('Signup error, retry later');
          this.toastrService.setToastrType('error');
          this.toastrService.setSowToastr(true);
        }
      });
  }

  onClickBack() {
    this.router.navigateByUrl('/' + ROUTES.home.base);
  }

  get nameErrorLabel() {
    const required = this.form.get('name')?.errors?.['required'];
    if (required) return 'Name is required';
    const minlength = this.form.get('name')?.errors?.['minlength'];
    if (minlength) return `Minimum length is ${this.minLengthName}`;
    return null;
  }

  get confirmPasswordErrorLabel() {
    const confirmPassErrors = this.form.get('confirmPassword')?.errors;
    if (confirmPassErrors?.['required']) return 'Password confirm is required';
    if (confirmPassErrors?.['confirmPassword'])
      return 'Password does not correspond';
    return null;
  }

  get passwordErrorLabel() {
    const errors = this.form.get('password')?.errors;
    if (errors?.['required']) return 'Password is required';
    if (errors?.['minlength'])
      return 'Password min length is ' + this.passMinLength;
    return null;
  }
}

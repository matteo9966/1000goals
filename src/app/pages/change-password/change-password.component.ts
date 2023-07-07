import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormComponent } from 'src/app/components/form/form.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { ToastrService } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';

const crossfieldPasswordValidation: ValidatorFn = (group: AbstractControl) => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  // console.log(password?.value,confirmPassword?.value)
  if (password?.value !== confirmPassword?.value) {
    return {
      samePassword: true,
    };
  }
  return null;
};

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    InputTextComponent,
    ReactiveFormsModule,
    FormComponent,
    ButtonComponent,
    MainHeaderComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  form!: FormGroup;
  private disableSubmitSubject = new BehaviorSubject(true);

  disableSubmit$: Observable<boolean> =
    this.disableSubmitSubject.asObservable();
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.initForm();


    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((_) => {
      if (this.form.invalid || this.samePasswordError) {
        this.disableSubmitSubject.next(true);
        return;
      }
      this.disableSubmitSubject.next(false);
    });
  }

  initForm() {
    this.form = this.fb.group(
      {
        password: this.fb.control('', [Validators.required]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      {
        validators: [crossfieldPasswordValidation],
        asyncValidators: [],
      }
    );
  }

  get samePasswordError() {
    return this.form.errors?.['samePassword'];
  }

  onSubmit() {
    const pswd = this.form.get('password')?.value;
    const username = this.userservice.getUserData()?.user?.name;
    if (!username) {
      this.toastrService.setToastrMessage(
        "missing username, can't change password"
      );
      this.toastrService.setToastrType('error');
      this.toastrService.setSowToastr(true);
      return;
    }

    if (!pswd) {
      return;
    }

    this.disableSubmitSubject.next(true)
    this.userservice.changePassword(pswd, username).subscribe((data) => {
      if (data && data?.data?.changed) {
        this.toastrService.setToastrMessage('Password updated successfully');
        this.toastrService.setToastrType('success');
        this.toastrService.setSowToastr(true);
        setTimeout(() => {
          this.router.navigateByUrl(ROUTES.user.base);
        }, 1000);
      }
    });
  }
}

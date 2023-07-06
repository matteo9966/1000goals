import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
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
  imports: [CommonModule, InputTextComponent, ReactiveFormsModule, FormComponent,ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.initForm();
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
      },

    );
  }

  get samePasswordError(){
    return this.form.errors?.['samePassword']
  }


  onSubmit(){
    
  }



}

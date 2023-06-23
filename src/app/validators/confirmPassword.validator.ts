import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator = (form: FormGroup) => {
  const validatorFn: ValidatorFn = (control: AbstractControl) => {
    const password = form.get('password')?.value;
    if (!password) return { confirmPassword: true };
    const same = password === control.value;
    if (same) return null;
    return { confirmPassword: true };
  };
  return validatorFn;
};

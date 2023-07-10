import { AbstractControl, ValidatorFn } from '@angular/forms';

export const usernameValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  const regex = /^[a-zA-Z0-9]*$/gi;
  const valid = regex.test(value);
  if (!valid) {
    return { username: 'only alpha numeric characters are valid' };
  }
  if (value?.length < 3) {
    return { username: 'min length is 3' };
  }
  return null;
};

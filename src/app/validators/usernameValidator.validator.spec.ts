import { AbstractControl } from '@angular/forms';
import { usernameValidator } from './usernameValidator.validator';

describe('usernameValidator', () => {
  it('should be a function', () => {
    expect(typeof usernameValidator).toEqual('function');
  });

  it('should return an error object if user tries to input / or any symbol that is not alphanum', () => {
    const invaliduser = '/mad-dogo';
    const control = { value: invaliduser } as AbstractControl;
    const result = usernameValidator(control);
    expect(result).not.toBe(null);
  });

  it('less than 3 letters are invalid',()=>{
    const invaliduser='ao';
    const control={value:invaliduser} as AbstractControl;
    const result = usernameValidator(control);
    expect(result).not.toBeNull();
  })

  it('should not allow white space characters',()=>{
    const invalid = 'invalid user AAA';
    const control = {value:invalid} as AbstractControl;
    const result = usernameValidator(control);
    expect(result).not.toBeNull();

  })


});

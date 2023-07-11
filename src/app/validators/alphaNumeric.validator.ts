import { AbstractControl, ValidatorFn } from "@angular/forms";

export const alphanumericValidator:ValidatorFn = (control:AbstractControl)=>{
    const value = control.value
    const alphaNumeric = /^[a-z0-9\ ]*$/i
    const valid = alphaNumeric.test(value);

    if(!valid){
        return {
            alphaNumeric:"only alpha numeric values are accepted",
        }
    }
    return null
}
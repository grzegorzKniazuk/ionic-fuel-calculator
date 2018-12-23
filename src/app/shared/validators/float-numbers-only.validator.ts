import {AbstractControl, ValidationErrors} from '@angular/forms';

export function FloatNumberOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if ((isNaN(parseFloat(control.value)) || parseFloat(control.value).toString() !== control.value.toString()) && control.value !== '') {
    return ({
      floatNumbersOnly: true,
    });
  }
  return null;
}

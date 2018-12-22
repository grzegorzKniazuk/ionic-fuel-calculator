import {AbstractControl, ValidationErrors} from '@angular/forms';

export function NumberOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (isNaN(parseFloat(control.value)) || parseFloat(control.value).toString() !== control.value.toString()) {
    return ({
      numbersOnly: true,
    });
  }
  return null;
}

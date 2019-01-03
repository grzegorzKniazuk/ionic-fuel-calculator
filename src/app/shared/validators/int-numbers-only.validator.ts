import {AbstractControl, ValidationErrors} from '@angular/forms';

export function IntegerNumberOnlyValidator(control: AbstractControl): ValidationErrors | null {
    if ((isNaN(control.value) || control.value.toString() !== control.value.toString()) && control.value !== '') {
        return ({
            integerNumbersOnly: true,
        });
    }
    return null;
}

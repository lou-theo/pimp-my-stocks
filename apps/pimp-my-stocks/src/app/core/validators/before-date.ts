import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

export function isBeforeDateValidator(maximumDate: DateTime): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (
            !(control.value instanceof DateTime) ||
            (control.value as DateTime).startOf('day') <=
                maximumDate.startOf('day')
        ) {
            return null;
        } else {
            return { isAfter: true };
        }
    };
}

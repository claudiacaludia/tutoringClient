import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateValidator {
  static pastDate(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const now = new Date();

    now.setSeconds(0, 0);

    if (selectedDate < now) {
      return { pastDate: true };
    }
    return null;
  }
}

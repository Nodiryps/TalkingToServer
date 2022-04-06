import { AbstractControl, ValidatorFn } from '@angular/forms';
export class CustomValidators{
  static notBefore(notBeforeControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let currentDate = new Date(control.value);
      let notBeforeDate = new Date(notBeforeControl.value);
    
      if (currentDate < notBeforeDate) {
        return { notBefore: true };
      }
      return null;
    }
    
  }
}

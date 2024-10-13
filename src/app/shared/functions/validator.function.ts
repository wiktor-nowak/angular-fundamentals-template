import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailCorrectnessValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        const valid = emailRegex.test(control.value);
        return valid ? null : { invalidEmail: true };
      };
  }
import { Directive} from "@angular/core";
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms"
import { emailCorrectnessValidator } from "../functions/validator.function";

  @Directive({
    selector: '[appEmailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
  })
  export class EmailValidatorDirective implements Validator {
    validate(control: FormControl): ValidationErrors | null {
      return emailCorrectnessValidator()(control)
    }
  }
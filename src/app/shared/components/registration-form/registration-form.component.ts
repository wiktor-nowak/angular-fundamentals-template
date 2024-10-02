import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { emailCorrectnessValidator } from '@app/shared/functions/validator.function';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm = this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(6)]],
    email:['', Validators.required],
    password:['', Validators.required]
  });
  submitted: boolean = false

  constructor (private formBuilder: FormBuilder) {}

  handleSubmit() {
    this.submitted = true
  }

  checkIsValid(field: string) {
    return this.registrationForm.get(field)?.invalid && (this.registrationForm.get(field)?.touched || this.submitted)
  }
}

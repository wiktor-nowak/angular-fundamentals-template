import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, RegisterInterface } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent {
  registrationForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(6)]],
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  submitted: boolean = false;
  submitResult = {};

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  handleSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.auth.register(this.registrationForm.value as RegisterInterface);
      this.router.navigateByUrl("/courses");
    }
  }

  checkIsValid(field: string) {
    return (
      this.registrationForm.get(field)?.invalid &&
      (this.registrationForm.get(field)?.touched || this.submitted)
    );
  }

  redirectToLogin() {
    this.router.navigateByUrl("/login");
  }
}

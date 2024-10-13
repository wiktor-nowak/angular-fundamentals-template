import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, LoginInterface } from "@app/auth/services/auth.service";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email: string = "";
  password: string = "";
  submitted: boolean = false;
  faEyeIcon = faEye;
  faEyeSlashIcon = faEyeSlash;

  constructor(private auth: AuthService, private router: Router) {}

  handleSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value as LoginInterface);
      this.router.navigateByUrl("/courses");
    }
  }

  redirectToRegister() {
    this.router.navigateByUrl("/register");
  }
}

// emailValidator="email" #email="ngModel" email="" [(ngModel)]="email"

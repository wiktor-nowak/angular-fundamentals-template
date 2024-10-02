import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email: string = ''
  password: string = ''
  submitted:boolean = false
  faEyeIcon = faEye
  faEyeSlashIcon = faEyeSlash

  handleSubmit() {
    this.submitted = true
  }
}


// emailValidator="email" #email="ngModel" email="" [(ngModel)]="email"

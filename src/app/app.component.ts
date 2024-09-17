import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "courses-app";
  buttonName = "Some Other Name";
  infoButtonText = "Add New Course";
  isLoggedIn = false;
  loginButtonText: string = "Login";

  switchLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    this.loginButtonText = this.isLoggedIn ? "Logout" : "Login";
  }
}

import { Component } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "courses-app";
  buttonName = "Some Other Name";
  infoButtonText = "Add New Course";
}

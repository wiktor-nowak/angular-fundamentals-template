import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  isLoggedIn: boolean;
  loginButtonText: string;
  userName: string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthorized$.subscribe({
      next: (isAuthed) => {
        this.loginButtonText = isAuthed ? "Logout" : "Login";
        this.userName = isAuthed ? "NAME" : "";
        this.isLoggedIn = isAuthed;
      }
    });
  }
  goToLogin() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { UserService } from "@app/user/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loginButtonText: string;
  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private user: UserStoreService
  ) {
    this.authService.isAuthorized$.subscribe({
      next: (isAuthed) => {
        this.loginButtonText = isAuthed ? "Logout" : "Login";
        this.isLoggedIn = isAuthed;
      }
    });
  }

  ngOnInit(): void {
    this.user.getUser();
    this.user.name$.subscribe((value) => {
      this.userName = value;
    });
  }

  goToLogin() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.authService.logout();
  }
}

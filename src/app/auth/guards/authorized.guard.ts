import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthorizedGuard implements CanActivate {
  public constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isAuthorised) {
      return true;
    } else {
      return this.router.navigate(["/login"]);
    }
  }
}

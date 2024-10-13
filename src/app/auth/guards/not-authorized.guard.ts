import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NotAuthorizedGuard implements CanActivate {
  public constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isAuthorised) {
      return this.router.navigate(["/courses"]);
    } else {
      return true;
    }
  }
}

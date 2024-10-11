import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  isAdmin: boolean;
  constructor(private userService: UserStoreService, private router: Router) {}
  canActivate() {
    this.userService.getUser();
    this.userService.isAdmin$.subscribe((value) => {
      this.isAdmin = value;
    });
    return this.isAdmin || this.router.navigateByUrl("/courses");
  }
}

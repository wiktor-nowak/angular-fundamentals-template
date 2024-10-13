import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, of, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  private name$$ = new BehaviorSubject("");
  public name$ = this.name$$.asObservable();
  private isAdmin$$ = new BehaviorSubject(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.userService.getUser(this.name$$, this.isAdmin$$);
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}

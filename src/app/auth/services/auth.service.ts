import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { Router } from "@angular/router";
import { API_URL } from "@app/shared/mocks/mocks";

export interface LoginInterface {
  email: "string";
  password: "string";
}

export interface RegisterInterface extends LoginInterface {
  name: "string";
}

interface LoginResponse {
  successful: boolean;
  result: string;
  user?: {
    email: string;
    name: string;
  };
}

interface RegisterResponse {
  successful: boolean;
  errors?: string[];
  result?: string;
}

interface LogoutResponse {
  successful: boolean;
  result?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject(this.ss.getToken() ? true : false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private ss: SessionStorageService,
    private router: Router
  ) {}

  login(user: LoginInterface) {
    this.http.post<LoginResponse>(`${API_URL}/login`, user).subscribe({
      next: (data) => {
        if (data.successful) {
          this.isAuthorized$$.next(true);
          this.ss.setToken(data.result);
          this.router.navigateByUrl("/courses");
        } else {
          console.error(data.result);
        }
      }
    });
  }

  logout() {
    const token = this.ss.getToken();
    const headers = { Authorization: token, accept: "*/*" };
    this.http.delete<LogoutResponse>(`${API_URL}/logout`, { headers }).subscribe({
      next: () => {
        this.isAuthorized$$.next(false);
        this.ss.deleteToken();
        this.router.navigateByUrl("/login");
      },
      error: (error) => console.error(error)
    });
  }

  register(user: RegisterInterface) {
    this.http.post<RegisterResponse>(`${API_URL}/register`, user).subscribe({
      next: (data) => {
        if (data.successful) {
          this.login({ email: user.email, password: user.password });
        } else {
          data.errors?.map((err) => console.error(err));
        }
      }
    });
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
  }
}

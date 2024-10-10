import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "@app/shared/mocks/mocks";
import { catchError, of, tap } from "rxjs";

interface UserResponse {
  successful: true;
  result: {
    name: null;
    email: "admin@email.com";
    password: "admin123";
    role: "admin";
    id: "85aa767d-73c0-4e23-9a02-27902d418b37";
  };
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(name, isAdmin) {
    this.http
      .get<UserResponse>(`${API_URL}/users/me`)
      .pipe(
        tap((data) => {
          name.next(data.result.name);
          isAdmin.next(data.result.role === "admin");
        }),
        catchError((error) => {
          console.error("Error fetching courses:", error);
          return of([]);
        })
      )
      .subscribe();
  }
}

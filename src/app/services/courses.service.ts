import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "@app/shared/mocks/mocks";
import { AuthorIdResponse, AuthorsResponse } from "@app/shared/types/authors";
import { CourseData, CourseResponse, CoursesResponse } from "@app/shared/types/courses";
import {
  BehaviorSubject,
  catchError,
  finalize,
  first,
  forkJoin,
  map,
  Observable,
  of,
  take,
  tap,
  timeout
} from "rxjs";

const URL_COURSES = "/courses";
const URL_AUTHORS = "/authors";

@Injectable({
  providedIn: "root"
})
export class CoursesService {
  private isLoading$$ = new BehaviorSubject(true);
  public isLoading$ = this.isLoading$$.asObservable();
  private courses$$ = new BehaviorSubject([]);
  public courses$ = this.courses$$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  grabAuthorNames(authorIds: string[]) {
    let authors: Observable<AuthorIdResponse[]>;
    authors = forkJoin(authorIds.map((authorId) => this.getAuthorById(authorId)));
    return authors.pipe(
      map((authorResponse) => {
        return authorResponse
          .filter((author) => author.successful)
          .map((author) => author.result.name);
      })
    );
  }

  getAll() {
    this.isLoading$$.next(true);
    this.http
      .get<CoursesResponse>(`${API_URL + URL_COURSES}/all`)
      .pipe(
        tap((data) => {
          this.courses$$.next(data.result);
        }),
        catchError((error) => {
          console.error("Error fetching courses:", error);
          return of([]);
        }),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  createCourse(course: Omit<CourseData, "id" | "creationDate">) {
    this.http
      .post(`${API_URL}${URL_COURSES}/add`, JSON.stringify(course), {
        headers: { "Content-Type": "application/json" }
      })
      .pipe(
        catchError((error) => {
          console.error("Error fetching courses:/n", error);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          console.log("Course added successfully! ", data);
        }
      });
  }

  editCourse(id: string, course: Omit<CourseData, "id" | "creationDate">) {
    this.http
      .put(`${API_URL}${URL_COURSES}/${id}`, JSON.stringify(course), {
        headers: { "Content-Type": "application/json" }
      })
      .pipe(
        catchError((error) => {
          console.error(`Error editing course <${id}>:/n`, error);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          console.log(`Course <${id}> edited successfully!`, data);
        }
      });
  }

  getCourse(id: string) {
    return this.http.get<CourseResponse>(`${API_URL + URL_COURSES}/${id}`).pipe(
      first(),
      catchError((error) => {
        console.error("Error fetching course:/n", error);
        let emptyResponse: CourseResponse;
        return of(emptyResponse);
      })
    );
  }

  deleteCourse(id: string) {
    const headers = { accept: "*/*" };
    this.http.delete(`${API_URL}${URL_COURSES}/${id}`, { headers }).subscribe({
      next: () => {
        this.router.navigateByUrl("/courses");
      },
      error: (error) => console.error(error)
    });
  }

  filterCourses(value: string) {
    this.isLoading$$.next(true);
    this.http
      .get<CoursesResponse>(`${API_URL + URL_COURSES}/filter?title=${value}`)
      .pipe(
        tap((data) => {
          this.courses$$.next(data.result);
        }),
        catchError((error) => {
          console.error("Error fetching courses:/n", error);
          return of([]);
        }),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
    // this.http.get<CoursesResponse>(`${API_URL + URL_COURSES}/filter?${value}`).pipe(first());
  }

  getAllAuthors() {
    return this.http.get<AuthorsResponse>(`${API_URL + URL_AUTHORS}/all`).pipe(
      first(),
      catchError((error) => {
        console.error("Error fetching courses:/n", error);
        let emptyResponse: AuthorsResponse;
        return of(emptyResponse);
      })
    );
  }

  createAuthor(name: string) {
    this.http
      .post<{ successful: boolean }>(`${API_URL + URL_AUTHORS}/add`, { name: name })
      .subscribe({
        next: (data) => {
          console.log("Author added successfully! ", data);
        }
      });
  }

  getAuthorById(id: string) {
    return this.http.get<AuthorIdResponse>(`${API_URL + URL_AUTHORS}/${id}`).pipe(
      first(),
      catchError((error) => {
        console.error("Error fetching courses:/n", error);
        let emptyResponse: AuthorIdResponse;
        return of(emptyResponse);
      })
    );
  }
}

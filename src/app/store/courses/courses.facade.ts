import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { State } from "..";
import {
  getAllCourses,
  getCourse,
  getCourses,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector
} from "./courses.selectors";
import * as CourseActions from "./courses.actions";
import { CourseData, CourseRequest } from "@app/shared/types/courses";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean>;
  isSingleCourseLoading$: Observable<boolean>;
  isSearchingState$: Observable<boolean>;
  courses$: Observable<CourseData[]>;
  allCourses$: Observable<CourseData[]>;
  course$: Observable<CourseData>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {
    this.isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
    this.isSingleCourseLoading$ = this.store.pipe(select(isSingleCourseLoadingSelector));
    this.isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
    this.courses$ = this.store.pipe(select(getCourses));
    this.allCourses$ = this.store.pipe(select(getAllCourses));
    this.course$ = this.store.pipe(select(getCourse));
    this.errorMessage$ = this.store.pipe(select(getErrorMessage));
  }

  getAllCourses() {
    return this.store.dispatch(CourseActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    return this.store.dispatch(CourseActions.requestSingleCourse({ id }));
  }
  getFilteredCourses(title: string) {
    return this.store.dispatch(CourseActions.requestFilteredCourses({ title }));
  }
  editCourse(course: CourseRequest, id: string) {
    return this.store.dispatch(CourseActions.requestEditCourse({ course, id }));
  }
  createCourse(course: CourseRequest) {
    return this.store.dispatch(CourseActions.requestCreateCourse({ course }));
  }
  deleteCourse(id: string) {
    return this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
  }
}

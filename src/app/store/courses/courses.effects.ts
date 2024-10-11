import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CourseActions from "./courses.actions";
import { catchError, exhaustMap, filter, map, merge, mergeMap, of } from "rxjs";
import { CoursesStateFacade } from "./courses.facade";
import { CourseData } from "@app/shared/types/courses";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesFacade: CoursesStateFacade
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestAllCourses),
      mergeMap(() => {
        this.coursesService.getAll();
        return this.coursesService.courses$.pipe(
          map((courses) => CourseActions.requestAllCoursesSuccess({ courses })),
          catchError((error) => of(CourseActions.requestAllCoursesFail({ error: error.message })))
        );
      })
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestFilteredCourses),
      mergeMap(({ title }) =>
        this.coursesFacade.allCourses$.pipe(
          filter((course) => course["title"] === title),
          map((courses) => CourseActions.requestFilteredCoursesSuccess({ courses })),
          catchError((error) => of(CourseActions.requestAllCoursesFail({ error: error.message })))
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestSingleCourse),
      mergeMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((courseResponse) => CourseActions.requestSingleCourseSuccess({ courseResponse })),
          catchError((error) => of(CourseActions.requestSingleCourseFail({ error: error.message })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestDeleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map(() => CourseActions.requestDeleteCourseSuccess()),
          catchError((error) => of(CourseActions.requestDeleteCourseFail({ error: error.message })))
        )
      )
    )
  );

  editCourse$;
  createCourse$;
  redirectToTheCoursesPage$;
}

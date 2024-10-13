import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CourseActions from "./courses.actions";
import { catchError, concatMap, exhaustMap, filter, map, merge, mergeMap, of } from "rxjs";
import { CoursesStateFacade } from "./courses.facade";

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
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((coursesResult) =>
            CourseActions.requestAllCoursesSuccess({ courses: coursesResult.result })
          ),
          catchError((error) => of(CourseActions.requestAllCoursesFail({ error: error.message })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestFilteredCourses),
      exhaustMap(({ title }) =>
        this.coursesService.filterCourses(title).pipe(
          map((filteredResponse) =>
            CourseActions.requestFilteredCoursesSuccess({ courses: filteredResponse.result })
          ),
          catchError((error) =>
            of(CourseActions.requestFilteredCoursesFail({ error: error.message }))
          )
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestSingleCourse),
      exhaustMap(({ id }) =>
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
        this.coursesService.deleteCourse(id).pipe(
          map(() => CourseActions.requestDeleteCourseSuccess()),
          catchError((error) => of(CourseActions.requestDeleteCourseFail({ error: error.message })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestEditCourse),
      concatMap(({ id, course }) => {
        return this.coursesService.editCourse(id, course).pipe(
          map(() => CourseActions.requestEditCourseSuccess({ course: course })),
          catchError((error) => of(CourseActions.requestEditCourseFail({ error: error.message })))
        );
      })
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestCreateCourse),
      concatMap(({ course }) => {
        return this.coursesService.createCourse(course).pipe(
          map(() => {
            return CourseActions.requestCreateCourseSuccess({
              course: course
            });
          }),
          catchError((error) => of(CourseActions.requestCreateCourseFail({ error: error.message })))
        );
      })
    )
  );

  redirectToTheCoursesPage$;
}

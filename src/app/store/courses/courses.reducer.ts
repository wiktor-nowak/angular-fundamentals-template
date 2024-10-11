import { Action, createReducer, on } from "@ngrx/store";
import * as CourseActions from "./courses.actions";
import { CourseData } from "@app/shared/types/courses";

// Add your code here
export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: CourseData[];
  filteredCourses: CourseData[];
  course: CourseData | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  filteredCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null
};

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.requestAllCourses, (state) => ({ ...state, isAllCoursesLoading: true })),
  on(CourseActions.requestAllCoursesSuccess, (state, action) => ({
    ...state,
    allCourses: action.courses,
    isAllCoursesLoading: false
  })),
  on(CourseActions.requestAllCoursesFail, (state, action) => ({
    ...state,
    errorMessage: action.error,
    isAllCoursesLoading: false
  })),

  // ---------------------------------------------------------
  on(CourseActions.requestSingleCourse, (state) => ({ ...state, isSingleCourseLoading: true })),
  on(CourseActions.requestSingleCourseSuccess, (state, action) => ({
    ...state,
    course: action.courseResponse.result,
    isSingleCourseLoading: false
  })),
  on(CourseActions.requestSingleCourseFail, (state, action) => ({
    ...state,
    errorMessage: action.error,
    isSingleCourseLoading: false
  })),
  // ---------------------------------------------------------
  on(CourseActions.requestFilteredCourses, (state) => ({ ...state, isSearchState: true })),
  on(CourseActions.requestAllCoursesSuccess, (state, action) => ({
    ...state,
    filteredCourses: action.courses,
    isSearchState: false
  })),
  on(CourseActions.requestFilteredCoursesFail, (state, action) => ({
    ...state,
    errorMessage: action.error,
    isSearchState: false
  })),
  // ---------------------------------------------------------

  on(CourseActions.requestDeleteCourse, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestDeleteCourseSuccess, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestDeleteCourseFail, (state, action) => ({
    ...state,
    errorMessage: action.error
  })),
  // ---------------------------------------------------------

  on(CourseActions.requestEditCourse, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestEditCourseSuccess, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestEditCourseFail, (state, action) => ({
    ...state,
    errorMessage: action.error
  })),
  // ---------------------------------------------------------

  on(CourseActions.requestCreateCourse, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestCreateCourseSuccess, (state, action) => ({
    ...state
  })),
  on(CourseActions.requestCreateCourseFail, (state, action) => ({
    ...state,
    errorMessage: action.error
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);

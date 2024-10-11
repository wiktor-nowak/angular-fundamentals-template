import { createSelector } from "@ngrx/store";
import { State } from "src/app/store/index";

export const selectFeature = (state: State) => state.courses;

export const isAllCoursesLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isAllCoursesLoading
);
export const isSearchingStateSelector = createSelector(
  selectFeature,
  (state) => state.isSearchState
);
export const isSingleCourseLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isSingleCourseLoading
);
export const getCourses = createSelector(selectFeature, (state) => state.filteredCourses);
export const getAllCourses = createSelector(selectFeature, (state) => state.allCourses);
export const getCourse = createSelector(selectFeature, (state) => state.course);
export const getErrorMessage = createSelector(selectFeature, (state) => state.errorMessage);

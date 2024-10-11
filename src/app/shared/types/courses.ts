export interface CourseData {
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
  id: string;
}

export interface CourseRequest extends Omit<CourseData, "id" | "creationDate"> {}

export interface CoursesResponse {
  successful: boolean;
  result?: CourseData[];
}

export interface CourseResponse {
  successful: boolean;
  result?: CourseData;
}

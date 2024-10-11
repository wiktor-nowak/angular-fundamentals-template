import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { CourseData } from "@app/shared/types/courses";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Input() courses: CourseData[] = [];
  @Input() isEditable = false;
  isLoading: boolean;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.coursesService.getAll();
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe((value) => {
      this.isEditable = value;
    });
    this.coursesService.courses$.subscribe((data) => {
      this.courses = data;
    });
    this.coursesService.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
  }

  searchCourses(searchQuery: string) {
    this.coursesService.filterCourses(searchQuery.split(" ").join(","));
  }

  addCourseNavigate() {
    this.router.navigateByUrl("/courses/add");
  }
}

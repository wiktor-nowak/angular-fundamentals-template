import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { CourseData } from "@app/shared/types/courses";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Input() courses$ = this.facade.allCourses$;
  @Input() isEditable = false;
  isLoading$ = this.facade.isAllCoursesLoading$;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userStoreService: UserStoreService,
    private facade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.facade.getAllCourses();
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe((value) => {
      this.isEditable = value;
    });
  }

  searchCourses(searchQuery: string) {
    if (searchQuery === "") {
      this.facade.getAllCourses();
      this.courses$ = this.facade.allCourses$;
    } else {
      this.facade.getFilteredCourses(searchQuery.split(" ").join(","));
      this.courses$ = this.facade.courses$;
    }
  }

  addCourseNavigate() {
    this.router.navigateByUrl("/courses/add");
  }
}

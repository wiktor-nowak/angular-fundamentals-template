import { AfterContentInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { AuthorIdResponse } from "@app/shared/types/authors";
import { CourseData } from "@app/shared/types/courses";
import { forkJoin, map, Observable } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"]
})
export class CourseInfoComponent implements OnInit {
  course: CourseData;
  id: string;
  authorsRes: Observable<AuthorIdResponse[]>;
  authorsProcessed: string;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.coursesService.getCourse(this.id).subscribe((data) => {
      this.course = data.result;
      this.authorsRes = forkJoin(
        this.course.authors.map((authorId) => this.coursesService.getAuthorById(authorId))
      );
      this.coursesService.grabAuthorNames(this.course.authors).subscribe((response) => {
        this.authorsProcessed = response.join(", ");
      });
    });
  }

  goBack() {
    this.router.navigateByUrl("/courses");
  }
}

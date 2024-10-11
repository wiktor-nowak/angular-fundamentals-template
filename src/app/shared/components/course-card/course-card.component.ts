import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { AuthorIdResponse } from "@app/shared/types/authors";
import { CourseData } from "@app/shared/types/courses";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"]
})
export class CourseCardComponent implements OnInit {
  @Input() card: CourseData;
  faTrashCanIcon = faTrashCan;
  faEditIcon = faEdit;

  authorsRes: Observable<AuthorIdResponse[]>;
  authorsProcessed: string;

  @Input() editable = false;
  @Output() clickOnShow = new EventEmitter<string>();

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.coursesService.grabAuthorNames(this.card.authors).subscribe((response) => {
      this.authorsProcessed = response.join(", ");
    });
  }

  getDisplayDuration() {
    return Math.floor(this.card.duration / 60) + ":" + (this.card.duration % 60) + " hours";
  }

  showCourse() {
    this.router.navigateByUrl(`/courses/${this.card.id}`);
  }

  deleteCourse() {
    this.coursesService.deleteCourse(this.card.id);
  }

  editCourse() {
    this.router.navigateByUrl(`/courses/edit/${this.card.id}`);
  }
}

import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TEST_LOREM_CARD, CardData } from "@app/mocks/data";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent {
  @Input() courses: CardData[] = [TEST_LOREM_CARD, TEST_LOREM_CARD, TEST_LOREM_CARD];
  @Input() isEditable = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  faTrashCanIcon = faTrashCan;
  faEditIcon = faEdit;
}

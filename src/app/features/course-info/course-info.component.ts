import { Component, Input } from "@angular/core";
import { TEST_LOREM_CARD, CardData } from "@app/mocks/data";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"]
})
export class CourseInfoComponent {
  @Input() course: CardData = TEST_LOREM_CARD;
}

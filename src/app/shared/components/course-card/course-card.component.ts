import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TEST_LOREM_CARD, CardData } from "@app/mocks/data";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"]
})
export class CourseCardComponent {
  @Input() card: CardData = TEST_LOREM_CARD;

  getDisplayDuration(duration: number) {
    console.log(this.card.creationDate);
    return Math.floor(duration / 60) + ":" + (duration % 60) + " hours";
  }

  getDisplayDate(date: Date) {
    return `${date.getUTCDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

  @Input() editable: boolean = false;
  @Output() clickOnShow = new EventEmitter<string>();

  onClickButton() {
    console.log("Emited!");
    this.clickOnShow.emit("Emited!");
  }
}

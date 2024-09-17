import { Component, Input } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent {
  @Input() text?: string;
  @Input() title: string = "Your List Is Empty";
}
// Use the names `title` and `text`.

import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, Input }               from "@angular/core";
import { PublicEnvironmentDocument }      from "@gavinsawyer/shortcuts-api";


interface FocusIconSizes {
  [key: string]: {
    "height": number,
    "width": number,
  }
}

@Component({
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  selector: "portfolio-focus",
  standalone: true,
  styleUrls: [
    "./focus.component.sass",
  ],
  templateUrl: "./focus.component.html",
})
export class FocusComponent {

  @Input({
    required: true,
  })
  public focus?: PublicEnvironmentDocument["focus"];

  public readonly focusIconSizes: FocusIconSizes;

  constructor() {
    this
      .focusIconSizes = {
        "Developing": {
          height: 16.1484,
          width: 14.5469,
        },
        "Do Not Disturb": {
          height: 15.5078,
          width: 15.4141,
        },
        "Driving": {
          height: 14.5234,
          width: 18.4844,
        },
        "Fitness": {
          height: 17.2422,
          width: 13.079,
        },
        "Personal": {
          height: 14.3047,
          width: 13.1484,
        },
        "Sleep": {
          height: 13.1953,
          width: 19.7969,
        },
        "Studying": {
          height: 17.8359,
          width: 18.6898,
        },
      };
  }

}

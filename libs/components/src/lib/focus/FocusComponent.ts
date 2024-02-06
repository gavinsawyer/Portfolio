import { NgIf, NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, Input }                from "@angular/core";
import { Focus }                           from "@gavinsawyer/shortcuts-api";


@Component({
  imports:     [
    NgIf,
    NgOptimizedImage,
    NgStyle,
  ],
  selector:    "components-focus",
  standalone:  true,
  styleUrls:   [
    "./FocusComponent.sass",
  ],
  templateUrl: "./FocusComponent.html",
})
export class FocusComponent {

  @Input({
    required: true,
  })
  public focus!: Focus;

  public readonly focusIconSizes: {
    [key: string]: {
      "height": number,
      "width": number,
    };
  } = {
    "Developing":     {
      height: 16.1484,
      width:  14.5469,
    },
    "Do Not Disturb": {
      height: 15.5078,
      width:  15.4141,
    },
    "Driving":        {
      height: 14.5234,
      width:  18.4844,
    },
    "Fitness":        {
      height: 17.2422,
      width:  13.079,
    },
    "Personal":       {
      height: 14.3047,
      width:  13.1484,
    },
    "Sleep":          {
      height: 13.1953,
      width:  19.7969,
    },
    "Studying":       {
      height: 17.8359,
      width:  18.6898,
    },
    "Work":           {
      height: 19.8359,
      width:  13.1406,
    },
  };

}

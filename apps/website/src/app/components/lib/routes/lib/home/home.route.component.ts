import { NgOptimizedImage } from "@angular/common";
import { Component }        from "@angular/core";


@Component({
  selector:    "website-app-home",
  standalone:  true,
  styleUrls:   [
    "./home.route.component.sass",
  ],
  templateUrl: "./home.route.component.html",
  imports:     [
    NgOptimizedImage,
  ],
})
export class HomeRouteComponent {

  public readonly yearsSinceSummer2014: number;

  constructor() {
    this
      .yearsSinceSummer2014 = new Date(
        new Date().getTime() - new Date("Sat Jun 21 2014 12:00:00 GMT-0400 (Eastern Daylight Time)").getTime()
      ).getFullYear() - 1970;
  }

}

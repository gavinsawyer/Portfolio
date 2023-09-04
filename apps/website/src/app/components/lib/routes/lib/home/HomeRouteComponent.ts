import { NgOptimizedImage } from "@angular/common";
import { Component }        from "@angular/core";
import { RouteComponent }   from "@portfolio/components";


@Component({
  selector:    "portfolio-website-home-route",
  standalone:  true,
  styleUrls:   [
    "./HomeRouteComponent.sass",
  ],
  templateUrl: "./HomeRouteComponent.html",
  imports:     [
    NgOptimizedImage,
  ],
})
export class HomeRouteComponent extends RouteComponent {

  public readonly yearsSinceSummer2014: number = new Date(
    new Date().getTime() - new Date("Sat Jun 21 2014 12:00:00 GMT-0400 (Eastern Daylight Time)").getTime()
  ).getFullYear() - 1970;

}

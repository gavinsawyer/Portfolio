import { NgOptimizedImage }         from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Meta }                     from "@angular/platform-browser";


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
export class HomeRouteComponent implements OnInit {

  @Input({
    required: true,
  }) private readonly description!: string;

  public readonly yearsSinceSummer2014: number;

  constructor(
    private readonly meta: Meta,
  ) {
    this
      .yearsSinceSummer2014 = new Date(
        new Date().getTime() - new Date("Sat Jun 21 2014 12:00:00 GMT-0400 (Eastern Daylight Time)").getTime()
      ).getFullYear() - 1970;
  }

  ngOnInit(): void {
    this
      .meta
      .updateTag(
        {
          "name": "description",
          "content": this.description,
        },
      );
  }

}

import { Component, Input, OnInit } from "@angular/core";
import { Meta }                     from "@angular/platform-browser";


@Component({
  selector:    "portfolio-website-privacy-route",
  standalone:  true,
  styleUrls:   [
    "./PrivacyRouteComponent.sass",
  ],
  templateUrl: "./PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent implements OnInit {

  @Input({
    required: true,
  }) private readonly description!: string;

  constructor(
    private readonly meta: Meta,
  ) {
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

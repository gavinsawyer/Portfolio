import { Component, inject, Input, OnInit } from "@angular/core";
import { Meta }                             from "@angular/platform-browser";


@Component({
  standalone: true,
  template:   "",
})
export class RouteComponent implements OnInit {

  @Input({
    required: true,
  }) private readonly description!: string;

  private readonly meta: Meta = inject(Meta);

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

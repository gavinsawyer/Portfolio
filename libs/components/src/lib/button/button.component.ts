import { CommonModule }                           from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "portfolio-button",
  standalone: true,
  styleUrls: [
    "./button.component.sass",
  ],
  templateUrl: "./button.component.html",
})
export class ButtonComponent {

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .click = new EventEmitter<void>();
  }

  @Output()
  click: EventEmitter<void>;

  @Input()
  svgHeight?: string;

  @Input()
  svgName?: string;

  @Input()
  svgWidth?: string;

  @Input()
  text?: string;

  @Input()
  type?: string;

  @Input()
  url?: string;

}

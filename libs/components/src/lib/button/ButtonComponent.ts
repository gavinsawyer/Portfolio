import { CommonModule, NgOptimizedImage }         from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  imports:     [
    CommonModule,
    NgOptimizedImage,
  ],
  selector:    "portfolio-components-button",
  standalone:  true,
  styleUrls:   [
    "./ButtonComponent.sass",
  ],
  templateUrl: "./ButtonComponent.html",
})
export class ButtonComponent {

  @Output() public readonly action: EventEmitter<void>;

  @Input() public iconHeight?: number;
  @Input() public iconName?:   string;
  @Input() public iconWidth?:  number;
  @Input({
    required: true,
  })       public text!:       string;
  @Input() public url!:        string;

  constructor() {
    this
      .action = new EventEmitter<void>();
  }

}

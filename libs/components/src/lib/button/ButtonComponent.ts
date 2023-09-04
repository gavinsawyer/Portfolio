import { NgIf, NgOptimizedImage, NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output }            from "@angular/core";


@Component({
  imports: [
    NgIf,
    NgOptimizedImage,
    NgStyle,
    NgTemplateOutlet,
  ],
  selector:    "components-button",
  standalone:  true,
  styleUrls:   [
    "./ButtonComponent.sass",
  ],
  templateUrl: "./ButtonComponent.html",
})
export class ButtonComponent {

  @Output() public readonly action: EventEmitter<void> = new EventEmitter<void>();

  @Input() public iconHeight?: number;
  @Input() public iconName?:   string;
  @Input() public iconWidth?:  number;
  @Input({
    required: true,
  })       public text!:       string;
  @Input() public url?:        string;

}

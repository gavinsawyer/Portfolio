import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ResponsivityService }                    from "@portfolio/services";

@Component({
  selector: 'portfolio-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.sass'],
})
export class IconButtonComponent {
  constructor(
    ResponsivityService: ResponsivityService,
  ) {
    this
      .callback = new EventEmitter<void>();

    this
      .responsivityService = ResponsivityService;
  }

  @Output()
  callback: EventEmitter<void>;

  @Input()
  navigation?: boolean;

  @Input()
  svgName?: string;

  @Input()
  url?: string;

  @Input()
  action?: boolean;

  public readonly responsivityService: ResponsivityService;
}

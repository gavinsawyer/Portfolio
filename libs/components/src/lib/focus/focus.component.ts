import { Component, OnInit }                 from "@angular/core";
import { FocusService, ResponsivityService } from "@portfolio/services";


@Component({
  selector: 'portfolio-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.sass'],
})
export class FocusComponent implements OnInit {

  constructor(
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .FocusService = FocusService;
    this
      .ResponsivityService = ResponsivityService;
  }

  public readonly FocusService: FocusService;
  public readonly ResponsivityService: ResponsivityService;

  ngOnInit(): void {}
}

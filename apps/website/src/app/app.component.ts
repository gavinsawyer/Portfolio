import { Component }                                           from "@angular/core";
import { FocusService, HyperResponsivityService, PathService } from "@portfolio/services";


const { version } = require("../../../../package.json");
const { raw }     = require("../../../../.git-version.json");

@Component({
  selector: 'websiteApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  constructor(
    public readonly focusService: FocusService,
    public readonly hyperResponsivityService: HyperResponsivityService,
    public readonly pathService: PathService,
  ) {}

  public readonly version: string = version;
  public readonly raw: string = raw;

}

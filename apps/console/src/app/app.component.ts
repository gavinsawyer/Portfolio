import { Component }                             from "@angular/core";
import { HyperResponsivityService, PathService } from "@portfolio/services";


const { version } = require("../../../../package.json");
const { raw }     = require("../../../../.git-version.json");

@Component({
  selector: "console-app-root",
  styleUrls: [
    "./app.component.sass",
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
    public readonly pathService: PathService,
  ) {}

  public readonly version: string = version;
  public readonly raw: string = raw;

}

import { Component, Inject }                from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }        from "@portfolio/injection-tokens";
import { ResponsivityService, PathService } from "@portfolio/services";
import { GitInfo }                          from "git-describe";


@Component({
  selector:    "console-app-root",
  styleUrls:   [
    "./root.component.sass",
  ],
  templateUrl: "./root.component.html",
})
export class RootComponent {

  constructor(
    @Inject(GIT_INFO)        public readonly gitInfo:        Partial<GitInfo>,
    @Inject(PACKAGE_VERSION) public readonly packageVersion: string,

    public readonly hyperResponsivityService: ResponsivityService,
    public readonly pathService: PathService,
  ) {
  }

}

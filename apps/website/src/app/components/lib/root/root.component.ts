import { Component, Inject }                from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }        from "@portfolio/injection-tokens";
import { PathService, ResponsivityService } from "@portfolio/services";
import { GitInfo }                          from "git-describe";


@Component({
  selector:    "website-app-root",
  styleUrls:   [
    "./root.component.sass",
  ],
  templateUrl: "./root.component.html",
})
export class RootComponent {

  constructor(
    @Inject(GIT_INFO)        public readonly gitInfo:        Partial<GitInfo>,
    @Inject(PACKAGE_VERSION) public readonly packageVersion: string,

    public readonly responsivityService: ResponsivityService,
    public readonly pathService:         PathService,
  ) {
  }

}

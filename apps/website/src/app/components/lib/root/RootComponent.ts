import { Component, Inject }                from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }        from "@portfolio/injection-tokens";
import { PathService, ResponsivityService } from "@portfolio/services";
import { GitInfo }                          from "git-describe";


@Component({
  selector:    "portfolio-website-root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
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

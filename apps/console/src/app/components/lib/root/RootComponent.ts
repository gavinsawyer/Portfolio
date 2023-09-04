import { Component, inject }                from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }        from "@portfolio/injection-tokens";
import { PathService, ResponsivityService } from "@portfolio/services";
import { GitInfo }                          from "git-describe";


@Component({
  selector:    "portfolio-console-root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  public readonly gitInfo:             Partial<GitInfo>    = inject(GIT_INFO);
  public readonly packageVersion:      string              = inject(PACKAGE_VERSION);
  public readonly pathService:         PathService         = inject(PathService);
  public readonly responsivityService: ResponsivityService = inject(ResponsivityService);

}

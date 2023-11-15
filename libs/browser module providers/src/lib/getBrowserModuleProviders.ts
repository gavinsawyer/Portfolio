import { IMAGE_LOADER, ImageLoaderConfig }            from "@angular/common";
import { EnvironmentProviders, InjectionToken }       from "@angular/core";
import { ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { provideClientHydration }                     from "@angular/platform-browser";
import { ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }     from "@portfolio/injection-tokens";
import { Environment }                                from "@portfolio/interfaces";
import { GitInfo }                                    from "git-describe";


export const getBrowserModuleProviders: (options: { "environment": Environment, "gitInfo": Partial<GitInfo>, "packageVersion": string }) => (EnvironmentProviders | typeof ScreenTrackingService | typeof UserTrackingService | { "provide": InjectionToken<Environment>, "useValue": string | Environment | Partial<GitInfo> | ((imageLoaderConfig: ImageLoaderConfig) => string) })[] = (options: { "environment": Environment, "gitInfo": Partial<GitInfo>, "packageVersion": string }): (EnvironmentProviders | typeof ScreenTrackingService | typeof UserTrackingService | { "provide": InjectionToken<Environment>, "useValue": string | Environment | Partial<GitInfo> | ((imageLoaderConfig: ImageLoaderConfig) => string) })[] => [
  provideClientHydration(),
  ScreenTrackingService,
  UserTrackingService,
  {
    provide:  ENVIRONMENT,
    useValue: options.environment,
  },
  {
    provide:  GIT_INFO,
    useValue: options.gitInfo,
  },
  {
    provide:  PACKAGE_VERSION,
    useValue: options.packageVersion,
  },
  {
    provide:  IMAGE_LOADER,
    useValue: (imageLoaderConfig: ImageLoaderConfig): string => "/assets/" + (imageLoaderConfig.loaderParams?.["type"] === "Focus Icon" ? "icons/focus/" + imageLoaderConfig.src.replace(
      /\s+/g,
      "-",
    ) + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Icon" ? "icons/" + imageLoaderConfig.src.replace(
      /\s+/g,
      "-",
    ) + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Photo" ? "photos/" + [
      imageLoaderConfig.src.replace(
        /\s+/g,
        "-",
      ),
      (imageLoaderConfig.width || imageLoaderConfig.loaderParams?.["maxWidth"]) + "px",
      "webp",
    ].join(".") : ""),
  },
  provideClientHydration(),
  ScreenTrackingService,
  UserTrackingService,
];

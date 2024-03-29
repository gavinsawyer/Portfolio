import { enableProdMode }         from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment }            from "../environment";
import { ConsoleBrowserModule }   from "./modules";


environment
  .production && enableProdMode();

(async (bootstrap: () => Promise<void>): Promise<void> => document.readyState === "complete" ? bootstrap() : document.addEventListener<"DOMContentLoaded">(
  "DOMContentLoaded",
  bootstrap,
  {
    once: true,
  },
))(
  (): Promise<void> => platformBrowserDynamic().bootstrapModule<ConsoleBrowserModule>(ConsoleBrowserModule).then<void, void>(
    (): void => void (0),
    (error: unknown): void => console.error(error),
  ),
);

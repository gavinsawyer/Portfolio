import { enableProdMode }         from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule }              from "./app/app.module";
import { environment }            from "./environments/environment";


environment
  .production && enableProdMode();

((bootstrap: () => void) => document.readyState === "complete" ? bootstrap() : document.addEventListener('DOMContentLoaded', bootstrap))(() => platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {})
  .catch((err) => console.error(err)));

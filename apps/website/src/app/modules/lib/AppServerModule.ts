import { NgModule }         from "@angular/core";
import { ServerModule }     from "@angular/platform-server";
import { RootComponent }    from "../../components";
import { AppBrowserModule } from "../../modules";


@NgModule({
  bootstrap: [
    RootComponent,
  ],
  imports:   [
    AppBrowserModule,
    ServerModule,
  ],
})
export class AppServerModule {
}

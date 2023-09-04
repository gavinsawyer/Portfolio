import { NgModule }             from "@angular/core";
import { ServerModule }         from "@angular/platform-server";
import { RootComponent }        from "../../components";
import { WebsiteBrowserModule } from "../../modules";


@NgModule({
  bootstrap: [
    RootComponent,
  ],
  imports:   [
    WebsiteBrowserModule,
    ServerModule,
  ],
})
export class WebsiteServerModule {
}

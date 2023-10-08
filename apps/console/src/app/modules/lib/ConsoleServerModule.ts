import { NgModule }             from "@angular/core";
import { ServerModule }         from "@angular/platform-server";
import { RootComponent }        from "../../components";
import { ConsoleBrowserModule } from "../../modules";


@NgModule({
  bootstrap: [
    RootComponent,
  ],
  imports:   [
    ConsoleBrowserModule,
    ServerModule,
  ],
})
export class ConsoleServerModule {
}

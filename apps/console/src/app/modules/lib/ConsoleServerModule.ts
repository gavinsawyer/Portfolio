import { NgModule }             from "@angular/core";
import { ServerModule }         from "@angular/platform-server";
import { RootComponent }        from "../../components";
import { ConsoleBrowserModule } from "../../modules";


@NgModule({
  imports:   [
    ConsoleBrowserModule,
    ServerModule,
  ],
  bootstrap: [
    RootComponent,
  ],
  providers: [],
})
export class ConsoleServerModule {
}

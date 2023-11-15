import { NgModule }                             from "@angular/core";
import { provideServerRendering, ServerModule } from "@angular/platform-server";
import { RootComponent }                        from "../../components";
import { ConsoleBrowserModule }                 from "../../modules";


@NgModule({
  bootstrap: [
    RootComponent,
  ],
  imports:   [
    ConsoleBrowserModule,
    ServerModule,
  ],
  providers: [
    provideServerRendering(),
  ],
})
export class ConsoleServerModule {
}

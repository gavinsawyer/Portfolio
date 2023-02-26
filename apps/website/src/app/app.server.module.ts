import { Inject, InjectionToken, NgModule } from "@angular/core";
import { makeStateKey, TransferState }      from "@angular/platform-browser";
import { ServerModule }                     from "@angular/platform-server";
import { AppComponent }                     from "./app.component";
import { AppBrowserModule }                 from "./app.browser.module";


export const REQUEST_PATH = new InjectionToken<string>("");

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: []
})
export class AppServerModule {

  constructor(
    @Inject(REQUEST_PATH)
    request_path: string,

    TransferState: TransferState,
  ) {
    TransferState
      .set<string>(makeStateKey<string>("requestPath"), request_path)
  }

}

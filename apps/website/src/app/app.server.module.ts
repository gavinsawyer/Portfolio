import { NgModule }                from "@angular/core";
import { ServerModule }            from "@angular/platform-server";
import { AppComponent }            from "./app.component";
import { AppBrowserModule }        from "./app.browser.module";


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
export class AppServerModule {}

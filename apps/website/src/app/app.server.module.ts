import { NgModule }                from "@angular/core";
import { FlexLayoutServerModule }  from "@angular/flex-layout/server";
import { ServerModule }            from "@angular/platform-server";
import { AppComponent }            from "./app.component";
import { AppBrowserModule }        from "./app.browser.module";


@NgModule({
  imports: [
    AppBrowserModule,
    FlexLayoutServerModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: []
})
export class AppServerModule {}

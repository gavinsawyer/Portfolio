import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule }  from "@angular/router";
import { AppComponent }  from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], {
      initialNavigation: "enabledBlocking"
    }),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}

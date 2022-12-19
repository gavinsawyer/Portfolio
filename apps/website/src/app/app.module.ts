import { NgModule }         from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule }    from "@angular/platform-browser";
import { RouterModule }     from "@angular/router";
import { AppComponent }     from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    RouterModule.forRoot(
      [
        {
          path: "",
          loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
        },
      ],
      {
        initialNavigation: "enabledBlocking",
      }
    ),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}

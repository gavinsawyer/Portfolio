import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule }            from "@angular/router";
import { AppComponent }            from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}

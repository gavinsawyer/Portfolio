import { NgModule }            from "@angular/core";
import { FlexLayoutModule }    from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule }       from "@angular/platform-browser";
import { RouterModule }        from "@angular/router";
import { AppComponent }        from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    FlexLayoutModule,
    ReactiveFormsModule,
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

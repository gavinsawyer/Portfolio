import { NgModule }                          from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore }    from "@angular/fire/firestore";
import { FlexLayoutModule }                  from "@angular/flex-layout";
import { ReactiveFormsModule }               from "@angular/forms";
import { BrowserModule }                     from "@angular/platform-browser";
import { RouterModule }                      from "@angular/router";
import { environment }                       from "../environments/environment";
import { AppComponent }                      from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
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

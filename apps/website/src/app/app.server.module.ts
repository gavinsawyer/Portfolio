import { NgModule }               from "@angular/core";
import { FlexLayoutServerModule } from "@angular/flex-layout/server";
import { ServerModule }           from "@angular/platform-server";
import { FIREBASE_ADMIN }         from "@portfolio/services";
import { AppComponent }           from "./app.component";
import { AppModule }              from "./app.module";


import * as admin from 'firebase-admin';

@NgModule({
  imports: [
    AppModule,
    FlexLayoutServerModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: () => admin.apps[0] || admin.initializeApp(process.env["FUNCTION_NAME"] ? undefined : {
        credential: admin.credential.applicationDefault(),
      }),
    },
  ]
})
export class AppServerModule {}

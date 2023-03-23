## GavinSawyer.dev
A simple personal website built with Firebase, Nx, and Angular 15.
### Apps
> #### [@portfolio/website](apps/website)
> 
> Online at: [gavinsawyer.dev](https://gavinsawyer.dev)
> 
> A simple personal website built for extensibility and serverless operation. Shows reCAPTCHA-authenticated users a contact form and the author's live Focus mode (`Do Not Disturb`/`Driving`/etc.). Analytics are collected on user interactions like scrolling, sending messages, and following links.
> 
> Route Components:
> - [Home](apps/website/src/app/routeComponents/home) `HTML` `Sass`
> - [Otherwise](apps/website/src/app/routeComponents/otherwise) `Angular Universal` `HTML` `Sass`
> - [Privacy](apps/website/src/app/routeComponents/privacy) `HTML` `Sass`
>
> `% npm run build` Build browser and server, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server

> #### [@portfolio/console](apps/console)
>
> Online at: [console.gavinsawyer.dev](https://console.gavinsawyer.dev)
>
> An admin console for seeing incoming messages.
>
> `% npm run build` Build browser and server, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server
### Libraries
> #### [@portfolio/ngx-firebase-web-authn-browser](libs/ngx-firebase-web-authn-browser) `Firebase Authentication` `Firebase Functions` `SimpleWebAuthn`
>
> An Angular Firebase extension for authentication with WebAuthn passkeys.
> 
> ##### Exported methods
>
> `createUserWithPasskey: (auth, functions, displayName: string) => Promise<UserCredential>`
> 
> `signInWithPasskey: (auth, functions) => Promise<UserCredential>`

> #### [@portfolio/ngx-firebase-web-authn-functions](libs/ngx-firebase-web-authn-functions) `Firebase Admin SDK` `Firebase Functions` `SimpleWebAuthn`
> Four Firebase Functions used to facilitate registering and authenticating WebAuthn passkeys. An additional function clears challenges if the user cancels the process.
> ##### Setup
> Add the following objects to the `rewrites` array in your `firebase.json`. They should be inside the `hosting` object of each app where you'd like to use ngxFirebaseWebAuthn.
> ```
> "rewrites": [
>   {
>     "source": "/ngxFirebaseWebAuthn/clearChallenge",
>     "function": "ngxFirebaseWebAuthnClearChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/createAuthenticationChallenge",
>     "function": "ngxFirebaseWebAuthnCreateAuthenticationChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/createRegistrationChallenge",
>     "function": "ngxFirebaseWebAuthnCreateRegistrationChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/verifyAuthentication",
>     "function": "ngxFirebaseWebAuthnVerifyAuthentication"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/verifyRegistration",
>     "function": "ngxFirebaseWebAuthnVerifyRegistration"
>   }
> ]
> ```
> Also add the following object to the `functions` array in your `firebase.json`.
> ```
> "functions": [
>   {
>     "codebase": "ngx-firebase-web-authn",
>     "ignore": [
>       "node_modules",
>       ".git",
>       "firebase-debug.log",
>       "firebase-debug.*.log"
>     ],
>     "runtime": "nodejs18",
>     "source": "dist/libs/ngx-firebase-web-authn-functions"
>   }
> ]
> ```
> Assign the Default Compute Service Account the `Service Account Token Creator` role in [GCP IAM Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
> 
> You may also need to assign the `allUsers` principal the `Cloud Function Invoker` role on each Cloud Function created by the `deploy` script. 
>
> `% npm run deploy`
> - Builds library with Nx and tsc, outputs to `dist/libs/ngx-firebase-web-authn-functions`.
> - Deploys `ngx-firebase-web-authn` codebase using the Firebase CLI.

> #### [@portfolio/components](libs/components) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`
>
> Angular components used in apps.
> - [Aside (Console)](libs/components/src/lib/aside-console) `HTML` `Sass`
> - [Aside (Website)](libs/components/src/lib/aside-website) `Firebase Analytics` `HTML` `Sass`
> - [Banner](libs/components/src/lib/banner) `HTML` `Sass`
> - [Button](libs/components/src/lib/button) `HTML` `Sass`
> - [Create Account Form](libs/components/src/lib/create-account-form) `Angular Forms` `HTML` `Sass`
> - [Focus](libs/components/src/lib/focus) `HTML` `Sass`
> - [Message Form](libs/components/src/lib/message-form) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`

> #### [@portfolio/types](libs/types) `TypeScript`

> #### [@portfolio/services](libs/services) `Angular CDK` `Angular Router` `Firebase Authentication` `Firestore`
>
> Angular services used in the app and components library. Provides anonymous authentication, live data, and responsive design features.
### Firebase Functions package:
> ### [functions/shortcuts](functions/shortcuts)
> Six Cloud Functions used to read and update Firestore from iOS and tvOS Automations.
>
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an Automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts).
>
> Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automation. iOS and tvOS (running on Apple TV and HomePods) Automations set device and home conditions according to the user's state.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

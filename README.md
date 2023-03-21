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
> `% npm run build` Create both browser and server bundles, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server

> #### [@portfolio/console](apps/console)
>
> Online at: [console.gavinsawyer.dev](https://console.gavinsawyer.dev)
>
> An admin-only console for seeing incoming messages.
>
> `% npm run build` Create both browser and server bundles, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server
### Libraries
> #### [@portfolio/ngx-firebase-web-authn](libs/ngx-firebase-web-authn) `Firebase Authentication` `Firebase Functions` `SimpleWebAuthn`
>
> An Angular Firebase extension for authentication with WebAuthn passkeys.
> - Used with the anonymous provider as default (See [@portfolio/services/AuthenticationService](libs/services/src/lib/authentication.service.ts)).
> - Requires some [firebase functions](/functions/ngxFirebaseWebAuthn/README.md), which must have the Service Account Token Creator role in [GCP IAM Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
> - Public keys and challenges are stored in the `users` collection in Firestore, where the user document ID and current signed-in user's uid are the same.
>
>
> ### NgxWebAuthnService
> #### Methods
>
> `createUserWithPasskey: (displayName: string) => Promise<UserCredential>`
> 
> `signInWithPasskey: () => Promise<UserCredential>`

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
> `% firebase deploy --only functions`
> 
> ### [functions/ngxFirebaseWebAuthn](functions/ngxFirebaseWebAuthn)
> Four Cloud Functions used to facilitate registering and authenticating WebAuthn passkeys.
>
> An [additional function](functions/ngxFirebaseWebAuthn/clearChallenge.js) clears challenges if the user cancels either registration or authentication.
> ### [functions/shortcuts](functions/shortcuts)
>
> Six Cloud Functions used to read and update Firestore from iOS and tvOS Automations.
>
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an Automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts).
>
> Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automation. iOS and tvOS (running on Apple TV and HomePods) Automations set device and home conditions according to the user's state.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

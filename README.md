## GavinSawyer.dev
A simple personal website built with Firebase, Nx, and Angular 15.
### Apps
> #### [@portfolio/website](apps/website)
> 
> Online at: [gavinsawyer.dev](https://gavinsawyer.dev)
> 
> A simple personal website built for extensibility and serverless operation. Shows reCAPTCHA-authenticated users a contact form and the author's live Focus mode (`Do Not Disturb`/`Driving`/etc.). Analytics are collected on user interactions like scrolling, sending messages, and following links.
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
> #### [@portfolio/components](libs/components) `Angular Forms` `Firebase Analytics` `FirebaseWebAuthn` `HTML` `NgxMask` `Sass`
>
> Angular components used in apps.
> - [Aside (Console)](libs/components/src/lib/aside-console) `FirebaseWebAuthn` `HTML` `Sass`
> - [Aside (Website)](libs/components/src/lib/aside-website) `Firebase Analytics` `HTML` `Sass`
> - [Banner](libs/components/src/lib/banner) `HTML` `Sass`
> - [Button](libs/components/src/lib/button) `HTML` `Sass`
> - [Create Account Form](libs/components/src/lib/create-account-form) `Angular Forms` `FirebaseWebAuthn` `HTML` `Sass`
> - [Focus](libs/components/src/lib/focus) `HTML` `Sass`
> - [Message Form](libs/components/src/lib/message-form) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`

> #### [@portfolio/functions](libs/functions) `Firebase Admin SDK` `Firebase Functions` `FirebaseWebAuthn`
> Six Cloud Functions used to read and update Firestore from iOS and tvOS Automations.
>
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an Automation which calls setFocus, for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts).
>
> Additional functions for location and time enable home automation. iOS and tvOS (running on Apple TV and HomePods) Automations set device and home conditions according to the user's state.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`

> #### [@portfolio/types](libs/types) `TypeScript`

> #### [@portfolio/services](libs/services) `Angular CDK` `Angular Router` `Firebase Authentication` `Firestore`
>
> Angular services used in the app and components library. Provides anonymous authentication, live data, and responsive design features.

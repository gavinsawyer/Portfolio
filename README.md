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
> `% npm run serve` Run local development server \

> #### [@portfolio/console](apps/console)
>
> Online at: [console.gavinsawyer.dev](https://console.gavinsawyer.dev)
>
> An admin-only console for seeing incoming messages.
>
> `% npm run build` Create both browser and server bundles, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server \
### Libraries
> #### [@portfolio/components](libs/components) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`
> 
> Angular components used in the app:
> - [Aside](libs/components/src/lib/aside) `Firebase Analytics` `HTML` `Sass`
> - [Banner](libs/components/src/lib/banner) `HTML` `Sass`
> - [Button](libs/components/src/lib/button) `HTML` `Sass`
> - [Focus](libs/components/src/lib/focus) `HTML` `Sass`
> - [Message Form](libs/components/src/lib/message-form) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`

> #### [@portfolio/types](libs/types) `TypeScript`

> #### [@portfolio/services](libs/services) `Angular CDK` `Angular Router` `Firebase Authentication` `Firestore`
> 
> Angular services used in the app and components library. Services provide anonymous authentication, live data, and responsive design features. 
### Firebase Functions package:
> #### [functions](functions)
> 
> `% firebase deploy --only functions`
>
> This package consists of six Google Cloud Functions, which are used to update Firestore from iOS Shortcuts and Automations.
>
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts).
>
> Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable automations. iOS Shortcuts and HomeKit Automations both access the user's state via [getAll](functions/shortcuts/all/get.js) and adjust device and home settings accordingly.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

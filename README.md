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
> - [Home](apps/website/src/app/routeComponents/home)
> - [Otherwise](apps/website/src/app/routeComponents/otherwise)
> - [Privacy](apps/website/src/app/routeComponents/privacy)
>
> `% npm run build` Create both browser and server bundles and prerender routes. \
> `% npm run deploy` Deploy to Cloud Run \
> `% npm run serve` Run local development server \
> `% npm run serve-ssr` Run local development server with SSR
### Libraries
> #### [@portfolio/components](libs/components) `Sass`
> 
> Angular components used in the app:
> - [Aside](libs/components/src/lib/aside)
> - [Button](libs/components/src/lib/button)
> - [Focus](libs/components/src/lib/focus)
> - [Icon Button](libs/components/src/lib/icon-button)
> - [Message Form](libs/components/src/lib/message-form)
> - [Photo](libs/components/src/lib/photo)

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`

> #### [@portfolio/types](libs/types) `TypeScript`

> #### [@portfolio/services](libs/services) `Firebase Authentication` `Firestore` `Angular CDK` `Router`
> 
> Angular services used in the app and components library. Services provide anonymous authentication, live data, and responsive design features. 
### Firebase Functions package:
> #### [functions](functions)
> 
> `% firebase deploy --only functions`
> 
> This package consists of six Google Cloud Functions, which are used to update documents from iOS Shortcuts and Automations. When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts). Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automations to respond to the user's state. iOS Shortcuts and HomeKit Automations both access the user's state via [getAll](functions/shortcuts/all/get.js) and set conditions accordingly.

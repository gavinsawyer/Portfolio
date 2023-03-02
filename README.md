## GavinSawyer.dev
A simple personal website built with Firebase, Nx, and Angular 15.
### Monorepo projects:
> #### [@portfolio/website](apps/website) `Angular Universal` `AngularFire` `Analytics` `Auth` `AppCheck w/ reCAPTCHA` `Firestore` `Sass`
> Online at: [gavinsawyer.dev](https://gavinsawyer.dev) \
> A simple personal website built for extensibility and serverless operation. Shows reCAPTCHA-authenticated users a contact form and the author's live Focus mode (`Do Not Disturb`/`Driving`/etc.). Analytics are collected on user interactions like scrolling, sending messages, and following links. Users are tracked across devices where possible.
> #### `% nx deploy` Deploy to Cloud Run
> #### `% nx serve-ssr` Run local development server

> #### [@portfolio/components](libs/components) `Sass`
> A library of Angular components used in the website.

> #### [@portfolio/interfaces](libs/interfaces)
> A library of TypeScript interfaces used throughout the repository.

> #### [@portfolio/services](libs/services) `Auth` `Firestore` `Angular CDK` `Router`
> A library of Angular services 
### Firebase Functions package:
> #### [functions](functions)
> #### `% firebase deploy --only functions`
> This package consists of six Google Cloud Functions, which are used to update documents from iOS Shortcuts and Automations. When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts). Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automations to respond to the user's state. iOS Shortcuts and HomeKit Automations both access the user's state via [getAll](functions/shortcuts/all/get.js) and set conditions accordingly. 

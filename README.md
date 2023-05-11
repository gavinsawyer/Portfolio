## GavinSawyer.dev
A simple personal website built with Firebase, Nx, and Angular 16.

[![GitHub workflow status](https://img.shields.io/github/actions/workflow/status/gavinsawyer/Portfolio/ci.yml)](https://github.com/gavinsawyer/Portfolio/actions/workflows/ci.yml)
### Apps
> #### [@portfolio/website](apps/website)
>
> Online at: [gavinsawyer.dev](https://gavinsawyer.dev)
>
> A simple personal website built for extensibility and serverless operation. Shows reCAPTCHA-authenticated users a contact form and the author's live Focus mode (`Do Not Disturb`/`Driving`/etc.). Analytics are collected on user interactions like scrolling, sending messages, and following links.
>
> `% npm run build` Build browser and server, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run

> #### [@portfolio/console](apps/console)
>
> An admin console for seeing incoming messages.
>
> `% npm run build` Build browser and server, prerender routes. \
> `% npm run deploy` Deploy to Cloud Run
### Libraries
> #### [@portfolio/components](libs/components) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`
>
> Angular components used in apps.
> - [Banner](libs/components/src/lib/banner) `HTML` `Sass`
> - [Button](libs/components/src/lib/button) `HTML` `Sass`
> - [Create Message Form](libs/components/src/lib/create-message-form) `Angular Forms` `Firebase Analytics` `HTML` `NgxMask` `Sass`
> - [Focus](libs/components/src/lib/focus) `HTML` `Sass`

> #### [@portfolio/functions](libs/functions) `Firebase Admin SDK` `Firebase Functions` `ShortcutsAPI`
>
> - [ShortcutsAPI](https://github.com/gavinsawyer/shortcuts-api)

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`

> #### [@portfolio/services](libs/services) `Angular CDK` `Angular Router` `Firebase Authentication` `Firestore`
>
> Angular services used in the app and components library. Provides anonymous authentication, live data, and responsive design features.

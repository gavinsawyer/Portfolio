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
> #### [@portfolio/components](libs/components) `Angular Forms` `Angular Universal` `Firebase Analytics` `HTML` `NgxMask` `Sass`
>
> Angular components shared between apps.

> #### [@portfolio/functions](libs/cloud functions) `Firebase Admin SDK` `Firebase Functions` `ShortcutsAPI`
>
> Custom APIs deployed as Cloud Functions:
> - [ShortcutsAPI](https://github.com/gavinsawyer/shortcuts-api)

> #### [@portfolio/injection-tokens](libs/injection tokens) `Angular`
>
> Injection tokens shared between apps and components for improved reusability.

> #### [@portfolio/interfaces](libs/interfaces) `TypeScript`
>
> Interfaces shared between all projects for type-safety.

> #### [@portfolio/services](libs/services) `Angular CDK` `Angular Router` `Firebase Authentication` `Firestore`
>
> Angular services used in apps and components. Provides anonymous authentication, live data, and responsive design features.

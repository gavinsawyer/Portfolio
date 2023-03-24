[back to Portfolio](../../README.md)

> #### @portfolio/functions `Firebase Admin SDK` `Firebase Functions` `ngxFirebaseWebAuthn`
> Six Cloud Functions used to read and update Firestore from iOS and tvOS Automations.
>
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an Automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts).
>
> Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automation. iOS and tvOS (running on Apple TV and HomePods) Automations set device and home conditions according to the user's state.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

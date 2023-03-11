[back to Portfolio](../)

> ### functions 
> 
> `% firebase deploy --only functions` 
> 
> This package consists of six Google Cloud Functions, which are used to update Firestore from iOS Shortcuts and Automations.
> 
> When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an automation which calls [setFocus](shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](../libs/services/src/lib/focus.service.ts).
> 
> Additional functions for [location](shortcuts/location) and [time](shortcuts/time) enable automations. iOS Shortcuts and HomeKit Automations both access the user's state via [getAll](shortcuts/all/get.js) and adjust device and home settings accordingly.
>
> > An example automation I've implemented turns off the Sleep Focus and turns on my apartment lights and espresso machine if I am at home when my wake-up alarm is stopped.

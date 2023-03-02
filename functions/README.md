[back to Portfolio](../)

> ## functions
> #### `% firebase deploy --only functions`
> This package consists of six Google Cloud Functions, which are used to update documents from iOS Shortcuts and Automations. When updating the Focus mode (`Do Not Disturb`/`Driving`/etc.) on any device, the iPhone triggers an automation which calls [setFocus](functions/shortcuts/focus/set.js), for example. This allows the user's live Focus to appear on the website via [FocusService](libs/services/src/lib/focus.service.ts). Additional functions for [location](functions/shortcuts/location) and [time](functions/shortcuts/time) enable home automations to respond to the user's state. iOS Shortcuts and HomeKit Automations both access the user's state via [getAll](functions/shortcuts/all/get.js) and set conditions accordingly. 

[back to Portfolio](../../README.md)

> #### @portfolio/ngx-firebase-web-authn-server `Firebase Admin SDK` `Firebase Functions` `SimpleWebAuthn`
> Four Firebase Functions used to facilitate registering and authenticating WebAuthn passkeys. An additional function clears challenges if the user cancels the process.
> ##### Setup
> Add the following objects to the `rewrites` array in your `firebase.json`. They should be inside the `hosting` object of each app where you'd like to use ngxFirebaseWebAuthn.
> ```
> "rewrites": [
>   {
>     "source": "/ngxFirebaseWebAuthn/clearChallenge",
>     "function": "ngxFirebaseWebAuthnClearChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/createAuthenticationChallenge",
>     "function": "ngxFirebaseWebAuthnCreateAuthenticationChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/createRegistrationChallenge",
>     "function": "ngxFirebaseWebAuthnCreateRegistrationChallenge"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/verifyAuthentication",
>     "function": "ngxFirebaseWebAuthnVerifyAuthentication"
>   },
>   {
>     "source": "/ngxFirebaseWebAuthn/verifyRegistration",
>     "function": "ngxFirebaseWebAuthnVerifyRegistration"
>   }
> ]
> ```
> Also add the following object to the `functions` array in your `firebase.json`.
> ```
> "functions": [
>   {
>     "codebase": "ngx-firebase-web-authn",
>     "ignore": [
>       "node_modules",
>       ".git",
>       "firebase-debug.log",
>       "firebase-debug.*.log"
>     ],
>     "runtime": "nodejs18",
>     "source": "dist/libs/ngx-firebase-web-authn-server"
>   }
> ]
> ```
> Assign the Default Compute Service Account the `Service Account Token Creator` role in [GCP IAM Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
> 
> You may also need to assign the `allUsers` principal the `Cloud Function Invoker` role on each Cloud Function created by the `deploy` script.
>
> `% npm run build` Build `ngxFirebaseWebAuthn` codebase\
> `% npm run deploy` Deploy `ngxFirebaseWebAuthn` codebase

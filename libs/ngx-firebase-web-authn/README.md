[back to Portfolio](../../README.md)

> #### @portfolio/ngx-firebase-web-authn `Firebase Authentication` `Firebase Functions` `SimpleWebAuthn`
>
> A standalone Angular Firebase extension for authentication with WebAuthn passkeys.
> - Used with the anonymous provider as default (See [@portfolio/services/AuthenticationService](../services/src/lib/authentication.service.ts)).
> - Requires some [firebase functions](../../functions/ngxFirebaseWebAuthn/README.md), which must have the Service Account Token Creator role in [GCP IAM Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
> - Public keys and challenges are stored in the `users` collection in Firestore, where the user document ID and current signed-in user's uid are the same.
>
>
> ### NgxWebAuthnService
> #### Methods
>
> > `createUserWithPasskey: (displayName: string) => Promise<UserCredential>`
> 
> > `signInWithPasskey: () => Promise<UserCredential>`


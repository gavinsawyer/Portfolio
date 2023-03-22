[back to Portfolio](../../README.md)

> #### @portfolio/ngx-firebase-web-authn `Firebase Authentication` `Firebase Functions` `SimpleWebAuthn`
>
> An Angular Firebase extension for authentication with WebAuthn passkeys.
> - Requires some [firebase functions](../../functions/ngxFirebaseWebAuthn/README.md), which must have the Service Account Token Creator role in [GCP IAM Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
> - Users signing in or creating an account with a passkey are signed in anonymously first.
> - Public keys and challenges are stored in the `ngxFirebaseWebAuthnUsers` collection in Firestore. Display names are not stored aside from in the passkey, so apps should use a separate `Users` collection. Stale challenges are automatically cleaned up.
>
> #### Exported methods
>
> > `createUserWithPasskey: (auth, functions, displayName: string) => Promise<UserCredential>`
> 
> > `signInWithPasskey: (auth, functions) => Promise<UserCredential>`


import { Injectable }                      from "@angular/core";
import { Functions, httpsCallableFromURL, HttpsCallableResult } from "@angular/fire/functions";


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    Functions: Functions,
  ) {
    this
      .register = (): void => {
        httpsCallableFromURL<undefined, PublicKeyCredentialCreationOptions>(Functions, "/auth/attestationOptions")()
          .then((httpsCallableResult: HttpsCallableResult<PublicKeyCredentialCreationOptions>): void => {
            navigator
              .credentials
              .create({
                "publicKey": {
                  ...httpsCallableResult.data,
                  "user": {
                    "displayName": "Gavin Sawyer",
                    "id": new TextEncoder().encode("_"),
                    "name": "gavinsawyer",
                  },
                  challenge: ((challenge: any): BufferSource => new TextEncoder().encode(challenge))(httpsCallableResult.data.challenge),
                },
              })
              .then((credential: Credential | null) => console.log(credential))
              .catch((reason: any): void => console.error(reason));
          })
          .catch((reason: any): void => console.error(reason));
      };
  }

  register: () => void;

}

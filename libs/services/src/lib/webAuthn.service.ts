import { Injectable }                                                                                                                          from "@angular/core";
import { Auth, signInWithCustomToken, UserCredential }                                                                                         from "@angular/fire/auth";
import { Functions, httpsCallableFromURL, HttpsCallableResult }                                                                                from "@angular/fire/functions";
import { startAuthentication, startRegistration }                                                                                              from "@simplewebauthn/browser";
import { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/typescript-types";


@Injectable({
  providedIn: "root",
})
export class WebAuthnService {

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions
  ) {
    this
      .authenticate = async (): Promise<boolean> => signInWithCustomToken(auth, (await httpsCallableFromURL<AuthenticationResponseJSON, string>(functions, "/functions/verifyAuthenticationResponse")(await startAuthentication((await httpsCallableFromURL<null, PublicKeyCredentialRequestOptionsJSON>(functions, "/functions/generateAuthenticationOptions")()).data))).data)
      .then<true, false>((_userCredential: UserCredential): true => true)
      .catch<false>((reason: any): false => {
        console
          .error(reason);

        return false;
      });
    this
      .register = async (displayName: string): Promise<boolean> => httpsCallableFromURL<RegistrationResponseJSON, boolean>(functions, "/functions/verifyRegistrationResponse")(await startRegistration((await httpsCallableFromURL<string, PublicKeyCredentialCreationOptionsJSON>(functions, "/functions/generateRegistrationOptions")(displayName)).data))
      .then<boolean, false>((httpsCallableResult: HttpsCallableResult<boolean>): boolean => httpsCallableResult.data)
      .catch<false>((reason: any): false => {
        console
          .error(reason);

        return false;
      });
  }

  public readonly authenticate: () => Promise<boolean>;
  public readonly register: (displayName: string) => Promise<boolean>;

}

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
      .authenticate = async (): Promise<boolean> => await (async (httpsCallableResult: HttpsCallableResult<string | false>): Promise<boolean> => httpsCallableResult.data ? await (async (_userCredential: UserCredential): Promise<true> => true)(await signInWithCustomToken(auth, httpsCallableResult.data)) : false)(await httpsCallableFromURL<AuthenticationResponseJSON, string | false>(functions, "/functions/verifyAuthenticationResponse")(await startAuthentication((await httpsCallableFromURL<null, PublicKeyCredentialRequestOptionsJSON>(functions, "/functions/generateAuthenticationOptions")()).data)))
      .catch<false>((reason: any): false => {
        console
          .error(reason);

        return false;
      });
    this
      .register = async (displayName: string): Promise<boolean> => await (async (registrationResponse: RegistrationResponseJSON | false): Promise<boolean> => registrationResponse ? (await httpsCallableFromURL<{
        "displayName": string,
        "response": RegistrationResponseJSON,
      }, boolean>(functions, "/functions/verifyRegistrationResponse")({
        displayName: displayName,
        response: registrationResponse,
      })).data : false)(await (async (httpsCallableResult: HttpsCallableResult<PublicKeyCredentialCreationOptionsJSON | false>) => httpsCallableResult.data ? await startRegistration(httpsCallableResult.data) : false)(await httpsCallableFromURL<string, PublicKeyCredentialCreationOptionsJSON | false>(functions, "/functions/generateRegistrationOptions")(displayName)))
      .catch<false>((reason: any): false => {
        console
          .error(reason);

        return false;
      });
  }

  public readonly authenticate: () => Promise<boolean>;
  public readonly register: (displayName: string) => Promise<boolean>;

}

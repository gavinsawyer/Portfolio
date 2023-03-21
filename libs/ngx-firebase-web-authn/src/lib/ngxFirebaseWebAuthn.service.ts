import { Injectable }                                                     from "@angular/core";
import { Auth, signInAnonymously, signInWithCustomToken, UserCredential } from "@angular/fire/auth";
import { Functions, httpsCallableFromURL }                                from "@angular/fire/functions";
import { startAuthentication, startRegistration }                                                                                              from "@simplewebauthn/browser";
import { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/typescript-types";


interface ClearChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {}
interface ClearChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "This user doesn't exist.",
}
interface ClearChallengeFunctionRequest {}
interface CreateAuthenticationChallengeFunctionResponse extends FunctionResponseSuccessful {
  "requestOptions": PublicKeyCredentialRequestOptionsJSON,
}
interface CreateAuthenticationChallengeFunctionRequest {}
interface CreateRegistrationChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "creationOptions": PublicKeyCredentialCreationOptionsJSON,
}
interface CreateRegistrationChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "A passkey already exists for this user.",
}
interface CreateRegistrationChallengeFunctionRequest {
  "displayName": string,
}
interface FunctionResponseSuccessful {
  "success": true,
}
interface FunctionResponseUnsuccessful {
  "success": false,
  "message": string,
}
interface VerifyAuthenticationFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "customToken": string,
}
interface VerifyAuthenticationFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "A passkey doesn't exist for this user." | "Authentication response not verified." | "Please create an authentication challenge first." | "This user doesn't exist." | "This user is already signed in.",
}
interface VerifyAuthenticationFunctionRequest {
  "authenticationResponse": AuthenticationResponseJSON,
}
interface VerifyRegistrationFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "customToken": string,
}
interface VerifyRegistrationFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message":  "Please create a registration challenge first." | "Registration response not verified." | "This user doesn't exist.",
}
interface VerifyRegistrationFunctionRequest {
  "registrationResponse": RegistrationResponseJSON,
}

type ClearChallengeFunctionResponse = ClearChallengeFunctionResponseSuccessful | ClearChallengeFunctionResponseUnsuccessful;
type CreateRegistrationChallengeFunctionResponse = CreateRegistrationChallengeFunctionResponseSuccessful | CreateRegistrationChallengeFunctionResponseUnsuccessful;
type VerifyAuthenticationFunctionResponse = VerifyAuthenticationFunctionResponseSuccessful | VerifyAuthenticationFunctionResponseUnsuccessful;
type VerifyRegistrationFunctionResponse = VerifyRegistrationFunctionResponseSuccessful | VerifyRegistrationFunctionResponseUnsuccessful;

@Injectable({
  providedIn: "root",
})
export class NgxFirebaseWebAuthnService {

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions
  ) {
    this
      .createUserWithPasskey = async (displayName: string): Promise<UserCredential> => (async (_userCredential: UserCredential): Promise<UserCredential> => (async (createRegistrationChallengeFunctionResponse: CreateRegistrationChallengeFunctionResponse): Promise<UserCredential> => createRegistrationChallengeFunctionResponse.success ? (async (registrationResponse: RegistrationResponseJSON): Promise<UserCredential> => (async (verifyRegistrationFunctionResponse: VerifyRegistrationFunctionResponse): Promise<UserCredential> => verifyRegistrationFunctionResponse.success ? await signInWithCustomToken(auth, verifyRegistrationFunctionResponse.customToken) : ((): never => {
        throw new Error("ngxFirebaseWebAuthn/verifyRegistrationFunction: " + verifyRegistrationFunctionResponse.message);
      })())((await httpsCallableFromURL<VerifyRegistrationFunctionRequest, VerifyRegistrationFunctionResponse>(functions, "/ngxFirebaseWebAuthn/verifyRegistration")({
        registrationResponse: registrationResponse,
      })).data))(await startRegistration(createRegistrationChallengeFunctionResponse.creationOptions).catch<never>(async (_reason: any): Promise<never> => ((clearChallengeFunctionResponse: ClearChallengeFunctionResponse): never => clearChallengeFunctionResponse.success ? ((): never => {
        throw new Error("ngxFirebaseWebAuthn/createPasskey: Cancelled by user.");
      })() : ((): never => {
        throw new Error("ngxFirebaseWebAuthn/clearChallengeFunction: " + clearChallengeFunctionResponse.message);
      })())((await httpsCallableFromURL<null, ClearChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/clearChallenge")()).data))) : ((): never => {
        throw new Error("ngxFirebaseWebAuthn/createRegistrationChallengeFunction: " + createRegistrationChallengeFunctionResponse.message);
      })())((await httpsCallableFromURL<CreateRegistrationChallengeFunctionRequest, CreateRegistrationChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/createRegistrationChallenge")({
        displayName: displayName,
      })).data))(await signInAnonymously(auth));
    this
      .signInWithPasskey = async (): Promise<UserCredential> => (async (createAuthenticationChallengeFunctionResponse: CreateAuthenticationChallengeFunctionResponse): Promise<UserCredential | never> => (async (authenticationResponse: AuthenticationResponseJSON): Promise<UserCredential> => (async (verifyAuthenticationFunctionResponse: VerifyAuthenticationFunctionResponse): Promise<UserCredential> => verifyAuthenticationFunctionResponse.success ? await signInWithCustomToken(auth, verifyAuthenticationFunctionResponse.customToken) : ((): never => {
        throw new Error("ngxFirebaseWebAuthn/verifyAuthenticationFunction: " + verifyAuthenticationFunctionResponse.message);
      })())((await httpsCallableFromURL<VerifyAuthenticationFunctionRequest, VerifyAuthenticationFunctionResponse>(functions, "/ngxFirebaseWebAuthn/verifyAuthentication")({
        authenticationResponse: authenticationResponse,
      })).data))(await startAuthentication(createAuthenticationChallengeFunctionResponse.requestOptions).catch<never>(async (_reason: any): Promise<never> => ((clearChallengeFunctionResponse: ClearChallengeFunctionResponse): never => clearChallengeFunctionResponse.success ? ((): never => {
        throw new Error("ngxFirebaseWebAuthn/signInWithPasskey: Cancelled by user.");
      })() : ((): never => {
        throw new Error("ngxFirebaseWebAuthn/clearChallengeFunction: " + clearChallengeFunctionResponse.message);
      })())((await httpsCallableFromURL<ClearChallengeFunctionRequest, ClearChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/clearChallenge")()).data))))((await httpsCallableFromURL<CreateAuthenticationChallengeFunctionRequest, CreateAuthenticationChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/createAuthenticationChallenge")()).data);
  }

  public readonly createUserWithPasskey: (displayName: string) => Promise<UserCredential>;
  public readonly signInWithPasskey: () => Promise<UserCredential>;

}

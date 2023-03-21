import { Injectable }                                                                                                                          from "@angular/core";
import { Auth, signInWithCustomToken, UserCredential }                                                                                         from "@angular/fire/auth";
import { Functions, httpsCallableFromURL }                                                                                                     from "@angular/fire/functions";
import { startAuthentication, startRegistration }                                                                                              from "@simplewebauthn/browser";
import { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/typescript-types";


interface ClearChallengeFunctionResponse extends FunctionResponse {}
interface ClearChallengeFunctionRequest {}
interface CreateAuthenticationChallengeFunctionResponseSuccessful extends FunctionResponse {
  "success": true,
  "requestOptions": PublicKeyCredentialRequestOptionsJSON,
}
interface CreateAuthenticationChallengeFunctionResponseUnsuccessful extends FunctionResponse {
  "success": false,
}
interface CreateAuthenticationChallengeFunctionRequest {}
interface CreateRegistrationChallengeFunctionResponseSuccessful extends FunctionResponse {
  "success": true,
  "creationOptions": PublicKeyCredentialCreationOptionsJSON,
}
interface CreateRegistrationChallengeFunctionResponseUnsuccessful extends FunctionResponse {
  "success": false,
}
interface CreateRegistrationChallengeFunctionRequest {
  "displayName": string,
}
interface FunctionResponse {
  "success": boolean,
}
interface VerifyAuthenticationFunctionResponseSuccessful extends FunctionResponse {
  "success": true,
  "customToken": string,
}
interface VerifyAuthenticationFunctionResponseUnsuccessful extends FunctionResponse {
  "success": false,
}
interface VerifyAuthenticationFunctionRequest {
  "authenticationResponse": AuthenticationResponseJSON,
}
interface VerifyRegistrationFunctionResponse extends FunctionResponse {}
interface VerifyRegistrationFunctionRequest {
  "registrationResponse": RegistrationResponseJSON,
}

type CreateAuthenticationChallengeFunctionResponse = CreateAuthenticationChallengeFunctionResponseSuccessful | CreateAuthenticationChallengeFunctionResponseUnsuccessful;
type CreateRegistrationChallengeFunctionResponse = CreateRegistrationChallengeFunctionResponseSuccessful | CreateRegistrationChallengeFunctionResponseUnsuccessful;
type VerifyAuthenticationFunctionResponse = VerifyAuthenticationFunctionResponseSuccessful | VerifyAuthenticationFunctionResponseUnsuccessful;

@Injectable({
  providedIn: "root",
})
export class NgxFirebaseWebAuthnService {

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions
  ) {
    this
      .createPasskey = async (displayName: string) => (async (createRegistrationChallengeFunctionResponse: CreateRegistrationChallengeFunctionResponse): Promise<void> => createRegistrationChallengeFunctionResponse.success ? (async (registrationResponse: RegistrationResponseJSON): Promise<void> => ((verifyRegistrationFunctionResponse: VerifyRegistrationFunctionResponse): void => verifyRegistrationFunctionResponse.success ? void (0) : ((): never => {
        throw new Error("verifyRegistrationFunction");
      })())((await httpsCallableFromURL<VerifyRegistrationFunctionRequest, VerifyRegistrationFunctionResponse>(functions, "/ngxFirebaseWebAuthn/verifyRegistration")({
        registrationResponse: registrationResponse,
      })).data))(await startRegistration(createRegistrationChallengeFunctionResponse.creationOptions).catch<never>(async (_reason: any): Promise<never> => ((clearChallengeFunctionResponse: ClearChallengeFunctionResponse): never => clearChallengeFunctionResponse.success ? ((): never => {
        throw new Error("cancelled");
      })() : ((): never => {
        throw new Error("clearChallengeFunction");
      })())((await httpsCallableFromURL<null, ClearChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/clearChallenge")()).data))) : ((): never => {
        throw new Error("createRegistrationChallengeFunction");
      })())((await httpsCallableFromURL<CreateRegistrationChallengeFunctionRequest, CreateRegistrationChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/createRegistrationChallenge")({
        displayName: displayName,
      })).data);
    this
      .signInWithPasskey = async (): Promise<UserCredential> => (async (createAuthenticationChallengeFunctionResponse: CreateAuthenticationChallengeFunctionResponse): Promise<UserCredential | never> => createAuthenticationChallengeFunctionResponse.success ? await (async (authenticationResponse: AuthenticationResponseJSON): Promise<UserCredential> => await (async (verifyAuthenticationFunctionResponse: VerifyAuthenticationFunctionResponse): Promise<UserCredential> => verifyAuthenticationFunctionResponse.success ? await signInWithCustomToken(auth, verifyAuthenticationFunctionResponse.customToken) : ((): never => {
        throw new Error("verifyAuthenticationFunction");
      })())((await httpsCallableFromURL<VerifyAuthenticationFunctionRequest, VerifyAuthenticationFunctionResponse>(functions, "/ngxFirebaseWebAuthn/verifyAuthentication")({
        authenticationResponse: authenticationResponse,
      })).data))(await startAuthentication(createAuthenticationChallengeFunctionResponse.requestOptions).catch<never>(async (_reason: any): Promise<never> => ((clearChallengeFunctionResponse: ClearChallengeFunctionResponse): never => clearChallengeFunctionResponse.success ? ((): never => {
        throw new Error("cancelled");
      })() : ((): never => {
        throw new Error("clearChallengeFunction");
      })())((await httpsCallableFromURL<ClearChallengeFunctionRequest, ClearChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/clearChallenge")()).data))) : ((): never => {
        throw new Error("createAuthenticationChallengeFunction");
      })())((await httpsCallableFromURL<CreateAuthenticationChallengeFunctionRequest, CreateAuthenticationChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/createAuthenticationChallenge")()).data);
  }

  public readonly createPasskey: (displayName: string) => Promise<void>;
  public readonly signInWithPasskey: () => Promise<UserCredential>;

}

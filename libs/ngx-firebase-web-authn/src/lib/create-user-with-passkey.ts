import { Auth, signInAnonymously, signInWithCustomToken, UserCredential }                                                                                                                                 from "@angular/fire/auth";
import { Functions, httpsCallableFromURL }                                                                                                                                                                from "@angular/fire/functions";
import { ClearChallengeFunctionResponse, CreateRegistrationChallengeFunctionRequest, CreateRegistrationChallengeFunctionResponse, VerifyRegistrationFunctionRequest, VerifyRegistrationFunctionResponse } from "@portfolio/ngx-firebase-web-authn";
import { startRegistration }                                                                                                                                                                              from "@simplewebauthn/browser";
import { RegistrationResponseJSON }                                                                                                                                                                       from "@simplewebauthn/typescript-types";


export async function createUserWithPasskey(auth: Auth, functions: Functions, displayName: string): Promise<UserCredential> {
  return (async (_userCredential: UserCredential): Promise<UserCredential> => (async (createRegistrationChallengeFunctionResponse: CreateRegistrationChallengeFunctionResponse): Promise<UserCredential> => createRegistrationChallengeFunctionResponse.success ? (async (registrationResponse: RegistrationResponseJSON): Promise<UserCredential> => (async (verifyRegistrationFunctionResponse: VerifyRegistrationFunctionResponse): Promise<UserCredential> => verifyRegistrationFunctionResponse.success ? await signInWithCustomToken(auth, verifyRegistrationFunctionResponse.customToken) : ((): never => {
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
  })).data))(await signInAnonymously(auth))
}

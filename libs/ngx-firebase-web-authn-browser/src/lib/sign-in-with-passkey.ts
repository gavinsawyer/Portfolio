import { Auth, signInAnonymously, signInWithCustomToken, UserCredential }                                                                                                                                                                        from "@angular/fire/auth";
import { Functions, httpsCallableFromURL }                                                                                                                                                                                                       from "@angular/fire/functions";
import { ClearChallengeFunctionRequest, ClearChallengeFunctionResponse, CreateAuthenticationChallengeFunctionRequest, CreateAuthenticationChallengeFunctionResponse, VerifyAuthenticationFunctionRequest, VerifyAuthenticationFunctionResponse } from "@portfolio/ngx-firebase-web-authn-functions";
import { startAuthentication }                                                                                                                                                                                                                   from "@simplewebauthn/browser";
import { AuthenticationResponseJSON }                                                                                                                                                                                                            from "@simplewebauthn/typescript-types";


export async function signInWithPasskey(auth: Auth, functions: Functions): Promise<UserCredential> {
  return (async (_userCredential: UserCredential): Promise<UserCredential> => (async (createAuthenticationChallengeFunctionResponse: CreateAuthenticationChallengeFunctionResponse): Promise<UserCredential | never> => createAuthenticationChallengeFunctionResponse.success ? (async (authenticationResponse: AuthenticationResponseJSON): Promise<UserCredential> => (async (verifyAuthenticationFunctionResponse: VerifyAuthenticationFunctionResponse): Promise<UserCredential> => verifyAuthenticationFunctionResponse.success ? await signInWithCustomToken(auth, verifyAuthenticationFunctionResponse.customToken) : ((): never => {
    throw new Error("ngxFirebaseWebAuthn/verifyAuthenticationFunction: " + verifyAuthenticationFunctionResponse.message);
  })())((await httpsCallableFromURL<VerifyAuthenticationFunctionRequest, VerifyAuthenticationFunctionResponse>(functions, "/ngxFirebaseWebAuthn/verifyAuthentication")({
    authenticationResponse: authenticationResponse,
  })).data))(await startAuthentication(createAuthenticationChallengeFunctionResponse.requestOptions).catch<never>(async (_reason: any): Promise<never> => ((clearChallengeFunctionResponse: ClearChallengeFunctionResponse): never => clearChallengeFunctionResponse.success ? ((): never => {
    throw new Error("ngxFirebaseWebAuthn/signInWithPasskey: Cancelled by user.");
  })() : ((): never => {
    throw new Error("ngxFirebaseWebAuthn/clearChallengeFunction: " + clearChallengeFunctionResponse.message);
  })())((await httpsCallableFromURL<ClearChallengeFunctionRequest, ClearChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/clearChallenge")()).data))) : ((): never => {
    throw new Error("ngxFirebaseWebAuthn/createAuthenticationChallengeFunction: " + createAuthenticationChallengeFunctionResponse.message);
  })())((await httpsCallableFromURL<CreateAuthenticationChallengeFunctionRequest, CreateAuthenticationChallengeFunctionResponse>(functions, "/ngxFirebaseWebAuthn/createAuthenticationChallenge")()).data))(await signInAnonymously(auth));
}

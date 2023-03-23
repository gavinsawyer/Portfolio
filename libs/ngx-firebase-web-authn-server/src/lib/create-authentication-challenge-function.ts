import { generateAuthenticationOptions }         from "@simplewebauthn/server";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { getAuth }                               from "firebase-admin/auth";
import { getFirestore }                          from "firebase-admin/firestore";
import { runWith }                               from "firebase-functions";
import { FunctionResponseSuccessful }            from "./function-response-successful";
import { FunctionResponseUnsuccessful }          from "./function-response-unsuccessful";


interface CreateAuthenticationChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "requestOptions": PublicKeyCredentialRequestOptionsJSON,
}
interface CreateAuthenticationChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "Please sign in anonymously first.",
}

export interface CreateAuthenticationChallengeFunctionRequest {}
export type CreateAuthenticationChallengeFunctionResponse = CreateAuthenticationChallengeFunctionResponseSuccessful | CreateAuthenticationChallengeFunctionResponseUnsuccessful;

export const ngxFirebaseWebAuthnCreateAuthenticationChallenge = runWith({
  enforceAppCheck: true,
})
  .https
  .onCall((createAuthenticationChallengeFunctionRequest: CreateAuthenticationChallengeFunctionRequest, callableContext): Promise<CreateAuthenticationChallengeFunctionResponse> => ((auth, firestore): Promise<CreateAuthenticationChallengeFunctionResponse> => (async (publicKeyCredentialRequestOptions): Promise<CreateAuthenticationChallengeFunctionResponse> => ((_writeResult): CreateAuthenticationChallengeFunctionResponse => ({
    "success": true,
    "requestOptions": publicKeyCredentialRequestOptions,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).set({
    "challenge": publicKeyCredentialRequestOptions.challenge,
  }, {
    merge: true,
  })))(generateAuthenticationOptions({
    rpID: "console.gavinsawyer.dev",
    userVerification: "required",
  })))(getAuth(), getFirestore()));

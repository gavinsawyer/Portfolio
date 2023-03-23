import { generateRegistrationOptions }            from "@simplewebauthn/server";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { getAuth }                                from "firebase-admin/auth";
import { getFirestore }                           from "firebase-admin/firestore";
import { runWith }                                from "firebase-functions";
import { FunctionResponseSuccessful }             from "./function-response-successful";
import { FunctionResponseUnsuccessful }           from "./function-response-unsuccessful";


interface CreateRegistrationChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "creationOptions": PublicKeyCredentialCreationOptionsJSON,
}
interface CreateRegistrationChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "Please sign in anonymously first." | "A passkey already exists for this user.",
}

export interface CreateRegistrationChallengeFunctionRequest {
  "displayName": string,
}
export type CreateRegistrationChallengeFunctionResponse = CreateRegistrationChallengeFunctionResponseSuccessful | CreateRegistrationChallengeFunctionResponseUnsuccessful;

export const ngxFirebaseWebAuthnCreateRegistrationChallenge = runWith({
  enforceAppCheck: true,
})
  .https
  .onCall((createRegistrationChallengeFunctionRequest: CreateRegistrationChallengeFunctionRequest, callableContext): Promise<CreateRegistrationChallengeFunctionResponse> => (async (auth, firestore): Promise<CreateRegistrationChallengeFunctionResponse> => await (async (userDocument): Promise<CreateRegistrationChallengeFunctionResponse> => userDocument && userDocument["credentialPublicKey"] ? {
    "success": false,
    "message": "A passkey already exists for this user.",
  } : await (async (publicKeyCredentialCreationOptions): Promise<CreateRegistrationChallengeFunctionResponse> => ((_writeResult): CreateRegistrationChallengeFunctionResponse => ({
    "success": true,
    "creationOptions": publicKeyCredentialCreationOptions,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).set({
    "challenge": publicKeyCredentialCreationOptions.challenge,
  })))(generateRegistrationOptions({
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
    rpID: "console.gavinsawyer.dev",
    rpName: "GavinSawyer.dev Console",
    userID: callableContext.auth!.uid,
    userName: createRegistrationChallengeFunctionRequest.displayName,
  })))((await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).get()).data()))(getAuth(), getFirestore()));

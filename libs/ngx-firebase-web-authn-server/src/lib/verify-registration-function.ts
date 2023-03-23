import { verifyRegistrationResponse }   from "@simplewebauthn/server";
import { RegistrationResponseJSON }     from "@simplewebauthn/typescript-types";
import { getAuth }                      from "firebase-admin/auth";
import { FieldValue, getFirestore }     from "firebase-admin/firestore";
import { runWith }                      from "firebase-functions";
import { FunctionResponseSuccessful }   from "./function-response-successful";
import { FunctionResponseUnsuccessful } from "./function-response-unsuccessful";


interface VerifyRegistrationFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "customToken": string,
}
interface VerifyRegistrationFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message":  "Please create a registration challenge first." | "Please sign in anonymously first." | "Registration response not verified." | "This user doesn't exist.",
}

export interface VerifyRegistrationFunctionRequest {
  "registrationResponse": RegistrationResponseJSON,
}
export type VerifyRegistrationFunctionResponse = VerifyRegistrationFunctionResponseSuccessful | VerifyRegistrationFunctionResponseUnsuccessful;

export const ngxFirebaseWebAuthnVerifyRegistration = runWith({
  enforceAppCheck: true,
})
  .https
  .onCall((verifyRegistrationFunctionRequest: VerifyRegistrationFunctionRequest, callableContext) => (async (auth, firestore) => (async (userDocumentSnapshot) => userDocumentSnapshot.exists ? (async (userDocument) => userDocument && userDocument["challenge"] ? (async (verifiedRegistrationResponse) => verifiedRegistrationResponse.verified ? (async (_writeResult) => (async (customToken) => ({
    "success": true,
    "customToken": customToken,
  }))(await auth.createCustomToken(callableContext.auth!.uid)))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).update({
    "challenge": FieldValue.delete(),
    "credentialCounter": verifiedRegistrationResponse.registrationInfo!.counter,
    "credentialId": verifiedRegistrationResponse.registrationInfo!.credentialID,
    "credentialPublicKey": verifiedRegistrationResponse.registrationInfo!.credentialPublicKey,
  })) : ((_writeResult) => ({
    "success": false,
    "message": "Registration response not verified.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).delete()))(await verifyRegistrationResponse({
    expectedChallenge: userDocument["challenge"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: verifyRegistrationFunctionRequest.registrationResponse,
  })) : ((_writeResult) => ({
    "success": false,
    "message": "Please create a registration challenge first.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).delete()))(userDocumentSnapshot.data()) : {
    "success": false,
    "message": "This user doesn't exist.",
  })(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).get()))(getAuth(), getFirestore()));

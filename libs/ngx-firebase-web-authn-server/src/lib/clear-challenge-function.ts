import { FieldValue, getFirestore }     from "firebase-admin/firestore";
import { runWith }                      from "firebase-functions";
import { FunctionResponseSuccessful }   from "./function-response-successful";
import { FunctionResponseUnsuccessful } from "./function-response-unsuccessful";


interface ClearChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {}
interface ClearChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "Please sign in anonymously first." | "This user doesn't exist.",
}

export interface ClearChallengeFunctionRequest {}
export type ClearChallengeFunctionResponse = ClearChallengeFunctionResponseSuccessful | ClearChallengeFunctionResponseUnsuccessful;

export const ngxFirebaseWebAuthnClearChallenge = runWith({
  enforceAppCheck: true,
})
  .https
  .onCall(async (clearChallengeFunctionRequest: ClearChallengeFunctionRequest, callableContext): Promise<ClearChallengeFunctionResponse> => (async (firestore): Promise<ClearChallengeFunctionResponse> => (async (userDocument): Promise<ClearChallengeFunctionResponse> => userDocument ? await (async (): Promise<ClearChallengeFunctionResponse> => userDocument["credentialPublicKey"] ? ((_writeResult): ClearChallengeFunctionResponse => ({
    "success": true,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).update({
    "challenge": FieldValue.delete(),
  })) : ((_writeResult): ClearChallengeFunctionResponse => ({
    "success": true,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).delete()))() : {
    "success": false,
    "message": "This user doesn't exist.",
  })((await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth!.uid).get()).data()))(getFirestore()));

import { DocumentReference, DocumentSnapshot, Firestore, getFirestore } from "firebase-admin/lib/firestore";
import { HttpsFunction, Request, Response, runWith }                    from "firebase-functions";
import { PrivateEnvironmentDocument }                                   from "./private-environment-document";
import { PublicEnvironmentDocument }                                    from "./public-environment-document";


export const resetFocus: HttpsFunction = runWith({
  enforceAppCheck: true,
})
  .https
  .onRequest(async (request: Request, response: Response): Promise<void> => request.body["ShortcutsAPIKey"] === process.env["SHORTCUTS_API_KEY"] ? ((firestore: Firestore): Promise<void> => (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).get().then<void>((privateEnvironmentDocumentSnapshot: DocumentSnapshot<PrivateEnvironmentDocument>): Promise<void> => (async (privateEnvironmentDocument: PrivateEnvironmentDocument | undefined): Promise<void> => privateEnvironmentDocument ? (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).update({
    "focus": privateEnvironmentDocument.focusPrior,
    "focusPrior": privateEnvironmentDocument.focus,
  }).then<void>((): Promise<void> => response.json({
    ...privateEnvironmentDocument,
    "focus": privateEnvironmentDocument.focusPrior,
    "focusPrior": privateEnvironmentDocument.focus,
  }).end() && (firestore.collection("environment").doc("public") as DocumentReference<PublicEnvironmentDocument>).update({
    "focus": privateEnvironmentDocument.focusPrior,
  }).then<void>((): void => void(0))) : response.status(403).end() && void(0))(privateEnvironmentDocumentSnapshot.data())))(getFirestore()) : response.status(403).end() && void(0));

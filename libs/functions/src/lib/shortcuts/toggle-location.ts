import { DocumentReference, DocumentSnapshot, Firestore, getFirestore } from "firebase-admin/firestore";
import { HttpsFunction, Request, Response, runWith }                    from "firebase-functions";
import { PrivateEnvironmentDocument }                                   from "./private-environment-document";


export const toggleLocation: HttpsFunction = runWith({
  enforceAppCheck: true,
})
  .https
  .onRequest(async (request: Request, response: Response): Promise<void> => request.body["ShortcutsAPIKey"] === process.env["SHORTCUTS_API_KEY"] ? ((firestore: Firestore): Promise<void> => (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).get().then<void>((privateEnvironmentDocumentSnapshot: DocumentSnapshot<PrivateEnvironmentDocument>) => (async (privateEnvironmentDocument: PrivateEnvironmentDocument | undefined): Promise<void> => privateEnvironmentDocument ? (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).update({
    "location": privateEnvironmentDocument.location === "away" ? process.env["SHORTCUTS_API_HOME_NAME"] : "away",
  }).then<void>((): void => response.json({
    ...privateEnvironmentDocumentSnapshot.data(),
    "location": privateEnvironmentDocument.location === "away" ? process.env["SHORTCUTS_API_HOME_NAME"] : "away",
  }).end() && void(0)) : response.status(404).end() && void(0))(privateEnvironmentDocumentSnapshot.data())))(getFirestore()) : response.status(403).end() && void(0));

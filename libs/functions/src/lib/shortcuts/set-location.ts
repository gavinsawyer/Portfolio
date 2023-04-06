import { DocumentReference, DocumentSnapshot, Firestore, getFirestore } from "firebase-admin/firestore";
import { HttpsFunction, Request, Response, runWith }                    from "firebase-functions";
import { PrivateEnvironmentDocument }                                   from "./private-environment-document";


export const setLocation: HttpsFunction = runWith({
  enforceAppCheck: true,
})
  .https
  .onRequest(async (request: Request, response: Response): Promise<void> => request.body["ShortcutsAPIKey"] === process.env["SHORTCUTS_API_KEY"] && request.body["location"] ? ((firestore: Firestore): Promise<void> => (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).get().then<void>((privateEnvironmentDocumentSnapshot: DocumentSnapshot<PrivateEnvironmentDocument>): Promise<void> => (async (privateEnvironmentDocument: PrivateEnvironmentDocument | undefined): Promise<void> => privateEnvironmentDocument ? privateEnvironmentDocument.location === request.body["location"] ? response.json(privateEnvironmentDocument).end() && void(0) : (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).update({
    "location": request.body["location"],
  }).then<void>((): void => response.json({
    ...privateEnvironmentDocument,
    "location": request.body["location"],
  }).end() && void(0)) : response.status(404).end() && void(0))(privateEnvironmentDocumentSnapshot.data())))(getFirestore()) : response.status(403).end() && void(0));

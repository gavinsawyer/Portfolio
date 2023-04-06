import { DocumentReference, DocumentSnapshot, Firestore, getFirestore } from "firebase-admin/firestore";
import { HttpsFunction, Request, Response, runWith }                    from "firebase-functions";
import { PrivateEnvironmentDocument }                                   from "./private-environment-document";
import { PublicEnvironmentDocument }                                    from "./public-environment-document";


export const setFocus: HttpsFunction = runWith({
  enforceAppCheck: true,
})
  .https
  .onRequest(async (request: Request, response: Response): Promise<void> => request.body["ShortcutsAPIKey"] === process.env["SHORTCUTS_API_KEY"] && request.body["focus"] ? ((firestore: Firestore): Promise<void> => (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).get().then<void>((privateEnvironmentDocumentSnapshot: DocumentSnapshot<PrivateEnvironmentDocument>): Promise<void> => (async (privateEnvironmentDocument: PrivateEnvironmentDocument | undefined): Promise<void> => privateEnvironmentDocument ? privateEnvironmentDocument["focus"] === request.body["focus"] ? response.json(privateEnvironmentDocument).end() && void(0) : (firestore.collection("environment").doc("private") as DocumentReference<PrivateEnvironmentDocument>).update({
    "focus": request.body["focus"],
    "focusPrior": privateEnvironmentDocument.focus,
  }).then<void>((): Promise<void> => (firestore.collection("environment").doc("public") as DocumentReference<PublicEnvironmentDocument>).update({
    "focus": request.body["focus"],
  }).then<void>((): void => void(0))) : response.status(404).end() && void(0))(privateEnvironmentDocumentSnapshot.data())))(getFirestore()) : response.status(403).end() && void(0));

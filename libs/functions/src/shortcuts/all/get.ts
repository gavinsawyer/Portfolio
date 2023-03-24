import { getFirestore } from "firebase-admin/firestore";
import { runWith }      from "firebase-functions";


export const getAll = runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && request.secure ? ((firestore) => firestore.collection("environment").doc("private").get().then((privateDocumentSnapshot) => ((_response) => {})(response.json(privateDocumentSnapshot.data()).end())))(getFirestore()) : ((_response) => {})(response.status(403).end()));

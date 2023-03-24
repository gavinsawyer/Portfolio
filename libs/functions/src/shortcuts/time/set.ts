import { getFirestore } from "firebase-admin/firestore";
import { runWith }      from "firebase-functions";


export const setTime = runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["time"] === "string" ? ((firestore) => ((privateDocumentReference) => privateDocumentReference.get().then((privateDocumentSnapshot) => privateDocumentSnapshot.data()?.["time"] === request.body["time"] ? ((_response) => {})(response.json(privateDocumentSnapshot.data()).end()) : ((updateData) => privateDocumentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...privateDocumentSnapshot.data(),
    ...updateData,
  })
  .end())))({
    "time": request.body["time"],
  })))(firestore.collection("environment").doc("private")))(getFirestore()) : ((_response) => {})(response.status(403).end()));

const firebaseFunctions = require("firebase-functions");
const firestore         = require("firebase-admin/firestore");


exports
  .default = firebaseFunctions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["time"] === "string" ? ((firestore) => ((privateDocumentReference) => privateDocumentReference.get().then((privateDocumentSnapshot) => privateDocumentSnapshot.data()["time"] === request.body["time"] ? ((_response) => {})(response.json(privateDocumentSnapshot.data()).end()) : ((updateData) => privateDocumentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...privateDocumentSnapshot.data(),
    ...updateData,
  })
  .end())))({
    "time": request.body["time"],
  })))(firestore.collection("environment").doc("private")))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["time"] === "string" ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["time"] === request.body["time"] ? ((_response) => {})(response.json(documentSnapshot.data()).end()) : ((updateData) => documentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...documentSnapshot.data(),
    ...updateData,
  }).end())))({
    "time": request.body["time"],
  })))(firestore.collection("_").doc(process.env["ShortcutsAPIPrivateDocumentID"])))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

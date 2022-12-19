const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => ((updateData) => documentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...documentSnapshot.data(),
    ...updateData,
  }).end())))({
    "location": documentSnapshot.data()["location"] === "home" ? "away" : "home",
  })))(firestore.collection("_").doc(process.env["ShortcutsAPIPrivateDocumentID"])))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["time"] === "string"  ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["time"] === request.body["time"] ? response.json(documentSnapshot.data()) : ((updateData) => documentReference.update(updateData).then(() => response.json({
    ...documentSnapshot.data(),
    ...updateData,
  })))({
    "time": request.body["time"],
  })))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

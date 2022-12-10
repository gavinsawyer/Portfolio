const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["location"] === "string"  ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["location"] === request.body["location"] ? response.json(documentSnapshot.data()) : ((updateData) => documentReference.update(updateData).then(() => response.json({
    ...documentSnapshot.data(),
    ...updateData,
  })))({
    "location": request.body["location"],
  })))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

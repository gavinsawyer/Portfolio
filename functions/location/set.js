const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["location"] === "string" ? ((firestore) => ((documentReference) => documentReference.update({
    "location": request.body["location"],
  }).then(() => documentReference.get().then((documentSnapshot) => response.json(documentSnapshot.data()))))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

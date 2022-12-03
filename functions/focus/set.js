const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["focus"] === "string" ? ((firestore) => ((documentReference) => documentReference.update({
    "focus": request.body["focus"],
  }).then(() => documentReference.get().then((documentSnapshot) => response.json(documentSnapshot.data()))))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

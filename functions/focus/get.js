const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => firestore.collection("_").doc("_").get().then((documentSnapshot) => response.json({
    "focus": documentSnapshot.get("focus"),
  })))(firestore.getFirestore()) : response.status(403).end());

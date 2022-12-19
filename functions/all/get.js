const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => firestore.collection("_").doc(process.env["ShortcutsAPIPrivateDocumentID"]).get().then((documentSnapshot) => ((_response) => {})(response.json(documentSnapshot.data()).end())))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

const firebase_functions = require("firebase-functions");
const firestore          = require("firebase-admin/firestore");


exports
  .default = firebase_functions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request
    .body["ShortcutsAPIKey"] === process
    .env["ShortcutsAPIKey"] && request
    .secure ? ((firestore) => firestore
      .collection("environment")
      .doc("private")
      .get()
      .then((privateDocumentSnapshot) => ((_response) => {})(response
        .json(privateDocumentSnapshot
          .data())
        .end())))(firestore
          .getFirestore()) : ((_response) => {})(response
            .status(403)
            .end()));

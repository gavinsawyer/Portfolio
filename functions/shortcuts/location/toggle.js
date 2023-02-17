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
    .env["ShortcutsAPIKey"] ? ((firestore) => ((privateDocumentReference) => privateDocumentReference
      .get()
      .then((privateDocumentSnapshot) => ((updateData) => privateDocumentReference
        .update(updateData)
        .then(() => ((_response) => {})(response
          .json({
            ...privateDocumentSnapshot.data(),
            ...updateData,
          })
          .end())))({
            "location": privateDocumentSnapshot.data()["location"] === "away" ? process.env["ShortcutsAPIHomeName"] : "away",
          })))(firestore
            .collection("environment")
            .doc("private")))(firestore
              .getFirestore()) : ((_response) => {})(response
                .status(403)
                .end()));

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
    .env["ShortcutsAPIKey"] && typeof request
    .body["location"] === "string" ? ((firestore) => ((documentReference) => documentReference
      .get()
      .then((documentSnapshot) => documentSnapshot
        .data()["location"] === request
        .body["location"] ? ((_response) => {})(response
          .json(documentSnapshot
            .data())
          .end()) : ((updateData) => documentReference
            .update(updateData)
            .then(() => ((_response) => {})(response
              .json({
                ...documentSnapshot.data(),
                ...updateData,
              })
              .end())))({
                "location": request.body["location"],
              })))(firestore
                .collection("_")
                .doc(process
                  .env["ShortcutsAPIPrivateDocumentID"])))(firestore
                    .getFirestore()) : ((_response) => {})(response
                      .status(403)
                      .end()));

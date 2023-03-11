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
    .body["focus"] === "string" ? ((firestore) => ((environmentCollectionReference) => ((privateDocumentReference) => privateDocumentReference
      .get()
      .then((privateDocumentSnapshot) => privateDocumentSnapshot
        .data()["focus"] === request
        .body["focus"] ? ((_response) => {})(response
          .json(privateDocumentSnapshot
            .data())
          .end()) : ((updateData) => privateDocumentReference
            .update(updateData)
            .then(() => ((_response) => ((_promise) => {})(environmentCollectionReference
              .doc("public")
              .update({
                "focus": request.body["focus"],
              })))(response
                .json({
                  ...privateDocumentSnapshot.data(),
                  ...updateData,
                })
                .end())))({
                  "focus": request.body["focus"],
                  "focusPrior": privateDocumentSnapshot.data()["focus"],
                })))(environmentCollectionReference
                  .doc("private")))(firestore
                    .collection("environment")))(firestore
                      .getFirestore()) : ((_response) => {})(response
                        .status(403)
                        .end()));

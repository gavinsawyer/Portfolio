const firebaseFunctions = require("firebase-functions");
const firestore         = require("firebase-admin/firestore");


exports
  .default = firebaseFunctions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => ((environmentCollectionReference) => ((privateDocumentReference) => privateDocumentReference.get().then((privateDocumentSnapshot) => ((updateData) => privateDocumentReference.update(updateData).then(() => ((_response) => ((_promise) => {})(environmentCollectionReference.doc("public").update({
    "focus": privateDocumentSnapshot.data()["focusPrior"],
  })))(response.json({
    ...privateDocumentSnapshot.data(),
    ...updateData,
  }).end())))({
    "focus": privateDocumentSnapshot.data()["focusPrior"],
    "focusPrior": privateDocumentSnapshot.data()["focus"],
  })))(environmentCollectionReference.doc("private")))(firestore.collection("environment")))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

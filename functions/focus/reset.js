const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => ((collectionReference) => ((documentReference) => documentReference.get().then((documentSnapshot) => ((updateData) => documentReference.update(updateData).then(() => ((_response) => ((_promise) => {})(collectionReference.doc(process.env["ShortcutsAPIPublicDocumentID"]).update({
    "focus": documentSnapshot.data()["focusPrior"],
  })))(response.json({
    ...documentSnapshot.data(),
    ...updateData,
  }).end())))({
    "focus": documentSnapshot.data()["focusPrior"],
    "focusPrior": documentSnapshot.data()["focus"],
  })))(collectionReference.doc(process.env["ShortcutsAPIPrivateDocumentID"])))(firestore.collection("_")))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["focus"] === "string" ? ((firestore) => ((collectionReference) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["focus"] === request.body["focus"] ? ((_response) => {})(response.json(documentSnapshot.data()).end()) : ((updateData) => documentReference.update(updateData).then(() => ((_response) => ((_promise) => {})(collectionReference.doc(process.env["ShortcutsAPIPublicDocumentID"]).update({
    "focus": request.body["focus"], // Public document new data
  })))(response.json({
    ...documentSnapshot.data(),
    ...updateData,
  }).end())))({
    "focus": request.body["focus"],                 // Private document new data
    "focusPrior": documentSnapshot.data()["focus"], // Private document new data
  })))(collectionReference.doc(process.env["ShortcutsAPIPrivateDocumentID"])))(firestore.collection("_")))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

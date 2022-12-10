const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => ((updateData) => documentReference.update(updateData).then(() => response.json({
    ...documentSnapshot.data(),
    ...updateData,
  })))({
    "focus": documentSnapshot.data()["focusPrior"],
    "focusPrior": documentSnapshot.data()["focus"],
  })))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

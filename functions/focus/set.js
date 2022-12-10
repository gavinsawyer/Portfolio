const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["focus"] === "string"  ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["focus"] === request.body["focus"] ? response.json(documentSnapshot.data()) : ((updateData) => documentReference.update(updateData).then(() => response.json({
    ...documentSnapshot.data(),
    ...updateData,
  })))({
    "focus": request.body["focus"],
    "focusPrior": documentSnapshot.data()["focus"],
  })))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : response.status(403).end());

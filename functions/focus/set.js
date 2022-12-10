const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["focus"] === "string" ? ((firestore) => ((documentReference) => documentReference.get().then((documentSnapshot) => documentSnapshot.data()["focus"] === request.body["focus"] ? ((_response) => {})(response.json(documentSnapshot.data()).end()) : ((updateData) => documentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...documentSnapshot.data(),
    ...updateData,
  }).end())))({
    "focus": request.body["focus"],
    "focusPrior": documentSnapshot.data()["focus"],
  })))(firestore.collection("_").doc("_")))(firestore.getFirestore()) : ((_response) => {})(response.status(403).end()));

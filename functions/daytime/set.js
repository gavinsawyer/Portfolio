const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore");


exports
  .default = functions
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["daytime"] === "boolean" ? ((firestore) => firestore.collection("_").doc("_").set({
    "daytime": request.body["daytime"],
  }, {
    mergeFields: [
      "daytime",
    ],
  }).then(() => response.status(200).end()))(firestore.getFirestore()) : response.status(403).end());

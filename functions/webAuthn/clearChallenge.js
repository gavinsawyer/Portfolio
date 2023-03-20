const firestore         = require("firebase-admin/firestore");
const firebaseFunctions = require("firebase-functions");


exports
  .default = firebaseFunctions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onCall((data, callableContext) => (async (firestore, FieldValue) => ((_writeResult) => false)((async (userDocumentSnapshot) => !userDocumentSnapshot.data()?.["credentialPublicKey"] ? ((_writeResult) => false)(await firestore.collection("users").doc(callableContext.auth.uid).delete()) : await firestore.collection("users").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
  }))(await firestore.collection("users").doc(callableContext.auth.uid).get())))(firestore.getFirestore(), firestore.FieldValue));

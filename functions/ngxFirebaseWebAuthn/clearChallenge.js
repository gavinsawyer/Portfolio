const firestore         = require("firebase-admin/firestore");
const firebaseFunctions = require("firebase-functions");


exports
  .default = firebaseFunctions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onCall((_data, callableContext) => (async (firestore, FieldValue) => ((userDocumentSnapshot) => userDocumentSnapshot.exists ? (async (userDocument) => userDocument["credentialPublicKey"] ? ((_writeResult) => ({
    "success": true,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
  })) : ((_writeResult) => ({
    "success": true,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(userDocumentSnapshot.data()) : {
    "success": false,
    "message": "This user doesn't exist.",
  })(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).get()))(firestore.getFirestore(), firestore.FieldValue));

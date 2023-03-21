const auth                 = require("firebase-admin/auth");
const firestore            = require("firebase-admin/firestore");
const firebaseFunctions    = require("firebase-functions");
const simpleWebAuthnServer = require("@simplewebauthn/server");


exports
  .default = firebaseFunctions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onCall((data, callableContext) => (async (auth, firestore, FieldValue) => (async (userDocumentSnapshot) => userDocumentSnapshot.exists ? (async (verifiedRegistrationResponse) => verifiedRegistrationResponse.verified ? (async (_writeResult) => ({
    "success": true,
  }))(await firestore.collection("users").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
    "credentialCounter": verifiedRegistrationResponse.registrationInfo.counter,
    "credentialId": verifiedRegistrationResponse.registrationInfo.credentialID,
    "credentialPublicKey": verifiedRegistrationResponse.registrationInfo.credentialPublicKey,
  })) : {
    "success": false,
    "message": "Registration response not verified.",
  })(await simpleWebAuthnServer.verifyRegistrationResponse({
    expectedChallenge: userDocumentSnapshot.data()["challenge"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data["registrationResponse"],
  })) : {
    "success": false,
    "message": "This user doesn't exist.",
  })(await firestore.collection("users").doc(callableContext.auth.uid).get()))(auth.getAuth(), firestore.getFirestore(), firestore.FieldValue));

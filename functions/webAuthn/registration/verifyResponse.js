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
  .onCall((data, callableContext) => (async (auth, firestore) => (async (challengeDocumentSnapshot) => challengeDocumentSnapshot.exists && (async (verifiedRegistrationResponse) => verifiedRegistrationResponse.verified && (async (_writeResult) => true)(await firestore.collection("credentials").doc(data["id"]).set({
    "counter": verifiedRegistrationResponse.registrationInfo.counter,
    "publicKey": verifiedRegistrationResponse.registrationInfo.credentialPublicKey,
    "uid": callableContext.auth.uid,
  })))(await simpleWebAuthnServer.verifyRegistrationResponse({
    expectedChallenge: challengeDocumentSnapshot.data()["value"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data,
  })))(await firestore.collection("challenges").doc(callableContext.auth.uid).get()))(auth.getAuth(), firestore.getFirestore()));

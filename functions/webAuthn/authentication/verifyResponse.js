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
  .onCall((data, callableContext) => (async (auth, firestore) => (async (challengeDocumentSnapshot, credentialDocumentSnapshot) => challengeDocumentSnapshot.exists && credentialDocumentSnapshot.exists && (async (verifiedAuthenticationResponse) => verifiedAuthenticationResponse.verified && (async (_writeResult) => await auth.createCustomToken(credentialDocumentSnapshot.data()["uid"]))(await firestore.collection("credentials").doc(data["id"]).update({
    "counter": verifiedAuthenticationResponse.authenticationInfo.newCounter,
  })))(await simpleWebAuthnServer.verifyAuthenticationResponse({
    authenticator: {
      counter: credentialDocumentSnapshot.data()["counter"],
      credentialID: new TextEncoder().encode(credentialDocumentSnapshot.id),
      credentialPublicKey: credentialDocumentSnapshot.data()["publicKey"],
    },
    expectedChallenge: challengeDocumentSnapshot.data()["value"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data,
  })))(await firestore.collection("challenges").doc(callableContext.auth.uid).get(), await firestore.collection("credentials").doc(data["id"]).get()))(auth.getAuth(), firestore.getFirestore()));

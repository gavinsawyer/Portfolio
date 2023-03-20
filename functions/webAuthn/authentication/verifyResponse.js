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
  .onCall((data, callableContext) => (async (auth, firestore, FieldValue) => data["response"]["userHandle"] !== callableContext.auth.uid ? (async (userDocumentSnapshot, anonymousUserDocumentSnapshot) => userDocumentSnapshot.exists && (async (verifiedAuthenticationResponse) => verifiedAuthenticationResponse.verified && (async (_writeResult) => (async (token) => (async (_writeResult) => token)(await firestore.collection("users").doc(callableContext.auth.uid).delete()))(await auth.createCustomToken(data["response"]["userHandle"])))(await firestore.collection("users").doc(data["response"]["userHandle"]).update({
    "challenge": FieldValue.delete(),
    "credentialCounter": verifiedAuthenticationResponse.authenticationInfo.newCounter,
    "credentialId": verifiedAuthenticationResponse.authenticationInfo.credentialID,
  })))(await simpleWebAuthnServer.verifyAuthenticationResponse({
    authenticator: {
      counter: userDocumentSnapshot.data()["credentialCounter"],
      credentialID: userDocumentSnapshot.data()["credentialId"],
      credentialPublicKey: userDocumentSnapshot.data()["credentialPublicKey"],
    },
    expectedChallenge: anonymousUserDocumentSnapshot.data()["challenge"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data,
  })))(await firestore.collection("users").doc(data["response"]["userHandle"]).get(), await firestore.collection("users").doc(callableContext.auth.uid).get()) : ((_writeResult) => false)(await firestore.collection("users").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
  })))(auth.getAuth(), firestore.getFirestore(), firestore.FieldValue));

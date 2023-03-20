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
  .onCall((data, callableContext) => data["response"]["userHandle"] !== callableContext.auth.uid && (async (auth, firestore) => await (async (userDocumentSnapshot, anonymousUserDocumentSnapshot) => userDocumentSnapshot.exists && (async (verifiedAuthenticationResponse) => verifiedAuthenticationResponse.verified && (async (_writeResult) => await auth.createCustomToken(data["response"]["userHandle"]))(await firestore.collection("users").doc(data["response"]["userHandle"]).set({
    "credentialCounter": verifiedAuthenticationResponse.authenticationInfo.newCounter,
    "credentialId": verifiedAuthenticationResponse.authenticationInfo.credentialID,
    "credentialPublicKey": userDocumentSnapshot.data()["credentialPublicKey"],
    "displayName": userDocumentSnapshot.data()["displayName"],
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
  })))(await firestore.collection("users").doc(data["response"]["userHandle"]).get(), await firestore.collection("users").doc(callableContext.auth.uid).get()))(auth.getAuth(), firestore.getFirestore()));

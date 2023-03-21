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
  .onCall((data, callableContext) => (async (auth, firestore, FieldValue) => data["authenticationResponse"]["response"]["userHandle"] !== callableContext.auth.uid ? (async (userDocumentSnapshot, anonymousUserDocumentSnapshot) => userDocumentSnapshot.exists ? (async (verifiedAuthenticationResponse) => verifiedAuthenticationResponse.verified ? (async (_writeResult) => (async (customToken) => (async (_writeResult) => ({
    "success": true,
    "customToken": customToken,
  }))(await firestore.collection("users").doc(callableContext.auth.uid).delete()))(await auth.createCustomToken(data["authenticationResponse"]["response"]["userHandle"])))(await firestore.collection("users").doc(data["authenticationResponse"]["response"]["userHandle"]).update({
    "challenge": FieldValue.delete(),
    "credentialCounter": verifiedAuthenticationResponse.authenticationInfo.newCounter,
    "credentialId": verifiedAuthenticationResponse.authenticationInfo.credentialID,
  })) : {
    "success": false,
    "message": "Authentication response not verified.",
  })(await simpleWebAuthnServer.verifyAuthenticationResponse({
    authenticator: {
      counter: userDocumentSnapshot.data()["credentialCounter"],
      credentialID: userDocumentSnapshot.data()["credentialId"],
      credentialPublicKey: userDocumentSnapshot.data()["credentialPublicKey"],
    },
    expectedChallenge: anonymousUserDocumentSnapshot.data()["challenge"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data["authenticationResponse"],
  })) : {
    "success": false,
    "message": "This user doesn't exist.",
  })(await firestore.collection("users").doc(data["authenticationResponse"]["response"]["userHandle"]).get(), await firestore.collection("users").doc(callableContext.auth.uid).get()) : ((_writeResult) => ({
    "success": false,
    "message": "This user is already signed in.",
  }))(await firestore.collection("users").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
  })))(auth.getAuth(), firestore.getFirestore(), firestore.FieldValue));

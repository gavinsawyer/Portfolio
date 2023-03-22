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
  .onCall((data, callableContext) => (async (auth, firestore, FieldValue) => data["authenticationResponse"]["response"]["userHandle"] !== callableContext.auth.uid ? (async (userDocumentSnapshot, anonymousUserDocumentSnapshot) => userDocumentSnapshot.exists ? (async (userDocument) => userDocument["credentialPublicKey"] ? (async (anonymousUserDocument) => anonymousUserDocument["challenge"] ? (async (verifiedAuthenticationResponse) => verifiedAuthenticationResponse.verified ? (async (_writeResult) => (async (_writeResult) => (async (customToken) => ({
    "success": true,
    "customToken": customToken,
  }))(await auth.createCustomToken(data["authenticationResponse"]["response"]["userHandle"])))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(data["authenticationResponse"]["response"]["userHandle"]).update({
    "challenge": FieldValue.delete(),
    "credentialCounter": verifiedAuthenticationResponse.authenticationInfo.newCounter,
    "credentialId": verifiedAuthenticationResponse.authenticationInfo.credentialID,
  })) : ((_writeResult) => ({
    "success": false,
    "message": "Authentication response not verified.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(await simpleWebAuthnServer.verifyAuthenticationResponse({
    authenticator: {
      counter: userDocument["credentialCounter"],
      credentialID: userDocument["credentialId"],
      credentialPublicKey: userDocument["credentialPublicKey"],
    },
    expectedChallenge: anonymousUserDocument["challenge"],
    expectedOrigin: "https://console.gavinsawyer.dev",
    expectedRPID: "console.gavinsawyer.dev",
    requireUserVerification: true,
    response: data["authenticationResponse"],
  })) : ((_writeResult) => ({
    "success": false,
    "message": "Please create an authentication challenge first.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(anonymousUserDocumentSnapshot.data()) : ((_writeResult) => ({
    "success": false,
    "message": "A passkey doesn't exist for this user.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(userDocumentSnapshot.data()) : ((_writeResult) => ({
    "success": false,
    "message": "This user doesn't exist.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).delete()))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(data["authenticationResponse"]["response"]["userHandle"]).get(), await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).get()) : ((_writeResult) => ({
    "success": false,
    "message": "This user is already signed in.",
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).update({
    "challenge": FieldValue.delete(),
  })))(auth.getAuth(), firestore.getFirestore(), firestore.FieldValue));

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
  .onCall((_data, callableContext) => (async (auth, firestore) => (async (publicKeyCredentialRequestOptions) => ((_writeResult) => ({
    "success": true,
    "requestOptions": publicKeyCredentialRequestOptions,
  }))(await firestore.collection("ngxFirebaseWebAuthnUsers").doc(callableContext.auth.uid).set({
    "challenge": publicKeyCredentialRequestOptions.challenge,
  }, {
    merge: true,
  })))(simpleWebAuthnServer.generateAuthenticationOptions({
    rpID: "console.gavinsawyer.dev",
    userVerification: "required",
  })))(auth.getAuth(), firestore.getFirestore()));

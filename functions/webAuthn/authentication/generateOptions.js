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
  .onCall((_data, callableContext) => (async (auth, firestore) => (async (publicKeyCredentialRequestOptions) => ((_writeResult) => publicKeyCredentialRequestOptions)(await firestore.collection("challenges").doc(callableContext.auth.uid).set({
    "value": publicKeyCredentialRequestOptions.challenge,
  })))(simpleWebAuthnServer.generateAuthenticationOptions({
    userVerification: "required",
    rpID: "console.gavinsawyer.dev",
  })))(auth.getAuth(), firestore.getFirestore()));

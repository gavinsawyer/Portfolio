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
  .onCall((data, callableContext) => (async (auth, firestore) => (async (publicKeyCredentialCreationOptions) => ((_writeResult) => publicKeyCredentialCreationOptions)(await firestore.collection("challenges").doc(callableContext.auth.uid).set({
    "value": publicKeyCredentialCreationOptions.challenge,
  })))(simpleWebAuthnServer.generateRegistrationOptions({
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
    rpID: "console.gavinsawyer.dev",
    rpName: "GavinSawyer.dev Console",
    userID: callableContext.auth.uid,
    userName: data,
  })))(auth.getAuth(), firestore.getFirestore()));

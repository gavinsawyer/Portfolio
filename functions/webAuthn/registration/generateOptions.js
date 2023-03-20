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
  .onCall((data, callableContext) => (async (auth, firestore) => ((userDocumentSnapshot) => !userDocumentSnapshot.data()["credentialPublicKey"] && (async (publicKeyCredentialCreationOptions) => ((_writeResult) => publicKeyCredentialCreationOptions)(await firestore.collection("users").doc(callableContext.auth.uid).set({
    "challenge": publicKeyCredentialCreationOptions.challenge,
    "displayName": data,
  })))(simpleWebAuthnServer.generateRegistrationOptions({
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
    rpID: "console.gavinsawyer.dev",
    rpName: "GavinSawyer.dev Console",
    userID: callableContext.auth.uid,
    userName: data,
  })))(await firestore.collection("users").doc(callableContext.auth.uid).get()))(auth.getAuth(), firestore.getFirestore()));

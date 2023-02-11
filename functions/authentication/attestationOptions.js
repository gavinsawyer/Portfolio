const base64url          = require("base64url");
const fido2_lib          = require("fido2-lib");
const firebase_functions = require("firebase-functions");


exports
  .default = firebase_functions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => ((fido2Lib) => fido2Lib
    .attestationOptions()
    .then((publicKeyCredentialCreationOptions) => response
      .json({
        "data": {
          ...publicKeyCredentialCreationOptions,
          "challenge": base64url(Buffer.from(publicKeyCredentialCreationOptions.challenge)),
        },
      })
      .end())
    .catch(() => response
      .status(500)
      .end()))(new fido2_lib
        .Fido2Lib({
          authenticatorUserVerification: "required",
          rpId: request.hostname,
        })));

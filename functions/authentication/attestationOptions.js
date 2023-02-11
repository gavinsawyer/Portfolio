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
    .then((publicKeyCredentialCreationOptions) => {
      console.log(publicKeyCredentialCreationOptions);

      response
        .json({
          data: {
            ...publicKeyCredentialCreationOptions,
            challenge: Buffer.from(publicKeyCredentialCreationOptions.challenge).toString("base64url"),
          },
        })
        .end();
    })
    .catch(() => response
      .status(500)
      .end()))(new fido2_lib
        .Fido2Lib({
          rpId: request.hostname,
        })));

const fido2_lib          = require("fido2-lib");
const firebase_functions = require("firebase-functions");


exports
  .default = firebase_functions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => ((fido2Lib) => fido2Lib
    .attestationResult({
      id: Buffer.from(request.body["id"]).toString("base64url"),
      response: {
        attestationObject : Buffer.from(request.body.response.attestationObject).toString("base64url"),
        clientDataJSON : Buffer.from(request.body.response.clientDataJSON).toString("base64url"),
      }
    })
    .then((fido2AttestationResult) => {
      console.log(fido2AttestationResult);

      response
        .json({
          data: fido2AttestationResult,
        })
        .end();
    })
    .catch(() => response
      .status(500)
      .end()))(new fido2_lib
        .Fido2Lib({
          rpId: request.hostname,
        })));

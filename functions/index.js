const app = require("firebase-admin/app");


app.initializeApp();

// Shortcuts API endpoints

exports.getAll         = require("./shortcuts/all/get").default;
exports.resetFocus     = require("./shortcuts/focus/reset").default;
exports.setFocus       = require("./shortcuts/focus/set").default;
exports.setLocation    = require("./shortcuts/location/set").default;
exports.toggleLocation = require("./shortcuts/location/toggle").default;
exports.setTime        = require("./shortcuts/time/set").default;


// WebAuthn API endpoints

exports.generateRegistrationOptions   = require("./webAuthn/registration/generateOptions").default;
exports.verifyRegistrationResponse    = require("./webAuthn/registration/verifyResponse").default;
exports.generateAuthenticationOptions = require("./webAuthn/authentication/generateOptions").default;
exports.verifyAuthenticationResponse  = require("./webAuthn/authentication/verifyResponse").default;

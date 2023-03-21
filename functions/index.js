const app = require("firebase-admin/app");


app.initializeApp();

// Shortcuts API endpoints

exports.getAll         = require("./shortcuts/all/get").default;
exports.resetFocus     = require("./shortcuts/focus/reset").default;
exports.setFocus       = require("./shortcuts/focus/set").default;
exports.setLocation    = require("./shortcuts/location/set").default;
exports.toggleLocation = require("./shortcuts/location/toggle").default;
exports.setTime        = require("./shortcuts/time/set").default;


// ngxFirebaseWebAuthn API endpoints

exports.clearChallenge                = require("./ngxFirebaseWebAuthn/clearChallenge").default;
exports.createAuthenticationChallenge = require("./ngxFirebaseWebAuthn/createAuthenticationChallenge").default;
exports.createRegistrationChallenge   = require("./ngxFirebaseWebAuthn/createRegistrationChallenge").default;
exports.verifyAuthentication          = require("./ngxFirebaseWebAuthn/verifyAuthentication").default;
exports.verifyRegistration            = require("./ngxFirebaseWebAuthn/verifyRegistration").default;

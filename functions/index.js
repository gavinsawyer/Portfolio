const app = require("firebase-admin/app");


app
  .initializeApp();

exports
  .authAssertionOptions = require("./authentication/assertionOptions")
  .default;
exports
  .authAssertionResult = require("./authentication/assertionResult")
  .default;
exports
  .authAttestationOptions = require("./authentication/attestationOptions")
  .default;
exports
  .authAttestationResult = require("./authentication/attestationResult")
  .default;

exports
  .getAll = require("./shortcuts/all/get")
  .default;

exports
  .resetFocus = require("./shortcuts/focus/reset")
  .default;
exports
  .setFocus = require("./shortcuts/focus/set")
  .default;

exports
  .setLocation = require("./shortcuts/location/set")
  .default;
exports
  .toggleLocation = require("./shortcuts/location/toggle")
  .default;

exports
  .setTime = require("./shortcuts/time/set")
  .default;

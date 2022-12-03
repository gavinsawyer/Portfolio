const app = require("firebase-admin/app");


app
  .initializeApp();

exports
  .getAll = require("./all/get")
  .default;

exports
  .setFocus = require("./focus/set")
  .default;
exports
  .setLocation = require("./location/set")
  .default;
exports
  .setTime = require("./time/set")
  .default;

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");

const GMAIL_PASSWORD = defineSecret("GMAIL_PASSWORD");

setGlobalOptions({ region: "asia-east1" });

const app = require("./app");

exports.api = onRequest(
  {
    secrets: [GMAIL_PASSWORD],
    cors: true,
    invoker: "public",
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 50,
  },
  app
);

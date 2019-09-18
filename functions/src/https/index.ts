import * as functions from "firebase-functions";
import * as express from "express";

import routeLogger from "./routes/utils/routeLogger";
import createAPI from "./routes/api";

// Closest region is `asia-northeast1`, but does not allow serving cloud
// functions to be served from the same domain - this is currently only
// available if we use the `us-central1` region :(
const REGION = "us-central1";

// Configure express app

const app = express();
app.use(routeLogger);

// Declare functions

export const api = functions.region(REGION).https.onRequest(createAPI(app));

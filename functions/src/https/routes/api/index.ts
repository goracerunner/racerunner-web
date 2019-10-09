import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { getRef } from "../../../utils/firebase";

import status from "../utils/status";

/**
 * Declare routes.
 */

const router = express.Router();

router.get("/status", status);

/**
 * Configure App.
 */
export default (app: express.Application) => async (
  req: express.Request,
  res: express.Response
) => {
  // Set up middleware
  app.use(bodyParser.json());

  // Configure CORS
  const useLocalhost = await getRef<boolean>("config/localhost");
  let origin: Array<RegExp> | boolean = [
    /https:\/\/goracerunner(-dev)?\.web\.app/
  ];
  if (useLocalhost) {
    origin = true;
  }
  app.use(cors({ credentials: true, origin }));

  // Process request
  app.use("/api", router)(req, res);
};

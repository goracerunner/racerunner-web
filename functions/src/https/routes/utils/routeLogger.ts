import * as express from "express";

/**
 * Middleware used to log the path that has been executed.
 * @param path The path to log
 */
const routeLogger: express.RequestHandler = (req, res, next) => {
  console.log(`Executing path <${req.path}>`);
  next();
};

export default routeLogger;

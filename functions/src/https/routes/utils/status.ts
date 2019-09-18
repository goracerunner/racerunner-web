import * as express from "express";

/**
 * Status OK.
 */
const status: express.RequestHandler = async (req, res) => {
  res.send(200);
};

export default status;

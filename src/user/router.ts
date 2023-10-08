import express from "express";
import dispatcher from "./dispatcher";

const router = express.Router();

//TODO: reuse handler
router.post("/", (req, res) => {
  const jsonRPCRequest = req.body;
  dispatcher.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    }
  });
});

export default router;
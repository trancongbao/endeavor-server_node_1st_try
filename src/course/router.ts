import express from "express";
import courseServer from "./dispatcher";

const router = express.Router();

// TODO: common to all components, move to index.ts
router.post("/", (req, res) => {
  const jsonRPCRequest = req.body;
  courseServer.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    }
  });
});

export default router;
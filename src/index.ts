import express from "express";
import {default as userDispatcher} from "./user/dispatcher";
import {default as courseDispatcher} from "./course/dispatcher";
import { JSONRPCServer } from "json-rpc-2.0";

const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use("/user", jsonRPCRouter(userDispatcher));
app.use("/course", jsonRPCRouter(courseDispatcher));

// Server
app.listen(3000, () => {
  console.log("Express server started on port 3000");
});

function jsonRPCRouter(dispatcher: JSONRPCServer<void>) {
  const router = express.Router();
  router.post("/", (req, res) => {
    const jsonRPCRequest = req.body;
    dispatcher.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      }
    });
  });
  return router
}
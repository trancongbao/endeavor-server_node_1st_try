import express from "express";
import {default as userDispatcher} from "./user/dispatcher";
import {default as courseDispatcher} from "./course/dispatcher";
import { JSONRPCServer } from "json-rpc-2.0";
import "scope-extensions-js";

express()
  .also(it => {
      it.use(express.json());
      it.use("/user", jsonRpcRouter(userDispatcher));
      it.use("/course", jsonRpcRouter(courseDispatcher));
  })
  .listen(3000, () => { console.log("Express server started on port 3000."); });

function jsonRpcRouter(jsonRpcDispatcher: JSONRPCServer<void>) {
  return express.Router().let(router => {
    return router.post("/", (request, response) => {
      jsonRpcDispatcher.receive(request.body).then((jsonRpcResponse) => {
          if (jsonRpcResponse) {
            response.json(jsonRpcResponse);
          } else {
            /*
            * The Server MUST NOT reply to a Notification.
            * Ref: https://www.jsonrpc.org/specification#notification
            */
          }
      });
    });
  })
}
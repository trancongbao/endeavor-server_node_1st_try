import express from "express";
import {default as loginJsonRpcMethodHandlers} from "./login/jsonRpcMethodHandlers";
import {default as adminJsonRpcMethodHandlers} from "./admin/jsonRpcMethodHandlers";
import {default as courseJsonRpcMethodHandlers} from "./course/jsonRpcMethodHandlers";
import { JSONRPCServer } from "json-rpc-2.0";
import "scope-extensions-js";
import { processJWT } from "./jwt/jwt";

express()
  .also(app => {
      // JSON-RPC is used so the json body must always be parsed
      app.use(express.json());

      // Login
      app.use("/login", jsonRpcRouter(loginJsonRpcMethodHandlers));

      // JWT token must be verified for following routes
      app.use(processJWT);

      app.use("/admin", jsonRpcRouter(adminJsonRpcMethodHandlers));
      app.use("/course", jsonRpcRouter(courseJsonRpcMethodHandlers));
  })
  .listen(3000, () => { console.log("Express server started on port 3000."); });

function jsonRpcRouter(jsonRpcMethodHandlers: JSONRPCServer<void>) {
  return express.Router().let(router => {
    return router.post("/", (request, response) => {
      jsonRpcMethodHandlers.receive(request.body).then((jsonRpcResponse) => {
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
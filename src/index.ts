import "scope-extensions-js";
import express from "express";
import { default as loginJsonRpcMethodHandlers } from "./login/jsonRpcMethodHandlers";
import { default as adminJsonRpcMethodHandlers } from "./admin/jsonRpcMethodHandlers";
import { default as studyJsonRpcMethodHandlers } from "./study/jsonRpcMethodHandlers";
import { JSONRPCServer } from "json-rpc-2.0";
import { processJWT } from "./jwt/jwt";
import { isAdmin } from "./admin/isAdmin";

express()
  .also((app) => {
    // JSON-RPC is used so the json body must always be parsed
    app.use(express.json());

    // Login
    app.use("/login", jsonRpcRouter(loginJsonRpcMethodHandlers));

    // JWT token must be verified for following routes
    app.use(processJWT);

    app.use("/study", jsonRpcRouter(studyJsonRpcMethodHandlers));

    // JWT token must be verified for following routes
    app.use(isAdmin);
    app.use("/admin", jsonRpcRouter(adminJsonRpcMethodHandlers));
  })
  .listen(3000, () => {
    console.log("Express server started on port 3000.");
  });

function jsonRpcRouter(jsonRpcMethodHandlers: JSONRPCServer<void>) {
  return express.Router().let((router) => {
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
  });
}

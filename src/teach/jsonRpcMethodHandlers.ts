import "scope-extensions-js";
import { JSONRPCServer } from "json-rpc-2.0";

export default new JSONRPCServer().apply(function () {
  this.addMethod("submitCourse", submitCourse);
});

function submitCourse() {}

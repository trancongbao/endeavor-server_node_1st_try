import "scope-extensions-js";
import { JSONRPCServer } from "json-rpc-2.0";
import { createWord, readWord, updateWord, deleteWord, findWord } from "./wordMethods";

export default new JSONRPCServer().apply(function () {
  this.addMethod("createWord", createWord);
  this.addMethod("readWord", readWord);
  this.addMethod("updateWord", updateWord);
  this.addMethod("deleteWord", deleteWord);
  this.addMethod("findWord", findWord);
});



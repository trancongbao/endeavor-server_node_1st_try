import "scope-extensions-js";
import { JSONRPCServer } from "json-rpc-2.0";

export default new JSONRPCServer().apply(function () {
  this.addMethod("createLesson", createLesson);
  this.addMethod("submitCourse", submitCourse);
});

function createLesson() {}

function createCard() {}

function createWord() {}

function findWord() {}

function submitCourse() {}

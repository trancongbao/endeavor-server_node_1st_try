import { JSONRPCServer } from "json-rpc-2.0";

const dispatcher = new JSONRPCServer();

dispatcher.addMethod("login", ({ message }: { message: string }) => {
  console.log(`User login: ${message}`);
});

dispatcher.addMethod("logout", ({ message }: { message: string }) => {
  console.log(`User logout: ${message}`);
});

export default dispatcher;
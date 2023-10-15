import { JSONRPCServer } from "json-rpc-2.0";
import pgEndeavorDb from "../databases/postgres"
import { generateJWT } from "./jwtUtils";
import "scope-extensions-js";

export default new JSONRPCServer().apply (
  function() {
    this.addMethod("login", loginHandler);
    this.addMethod("logout", ({ message }: { message: string }) => {
      console.log(`User logout: ${message}`);
    });
  }
)

function loginHandler({ userType, username, password }: { userType: string, username: string, password: string }) {
  return pgEndeavorDb
    .oneOrNone(`SELECT * FROM ${userType} WHERE username = $1 AND password = $2`, [username, password])
    .then((user) => {
      if (user) {
        const jwt = generateJWT({ username: username });
        return { jwt };
      } else {
        console.info("Invalid username or password.");
        return { error: "Invalid username or password." };
      }
    })
    .catch((error) => {
      console.error("Database error:", error);
      return { error: "An error occurred while processing your request." };
    });
}

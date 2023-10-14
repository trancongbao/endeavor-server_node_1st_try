import { JSONRPCServer } from "json-rpc-2.0";
import pgPromise from "pg-promise";
import { generateJWT } from "./jwtUtils";

const dispatcher = new JSONRPCServer();

const pgp = pgPromise();
const db = pgp({
  user: "postgres",
  host: "localhost",
  database: "endeavor",
  password: "postgres",
  port: 5432,
});

dispatcher.addMethod("login", ({ userType, username, password }) => {
  return db.oneOrNone(
    `SELECT * FROM ${userType} WHERE username = $1 AND password = $2`,
    [username, password]
  )
    .then((user) => {
      if (user) {
        const jwt = generateJWT({username: username} );
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
});

dispatcher.addMethod("logout", ({ message }: { message: string }) => {
  console.log(`User logout: ${message}`);
});

export default dispatcher;
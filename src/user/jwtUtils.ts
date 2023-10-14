import jwt from "jsonwebtoken";

const jwtSecret = "your-secret-key";

function generateJWT(payload: object): string {
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, jwtSecret, options);
}

export { generateJWT };

import jwt from "jsonwebtoken";

export { generateJWT, parseJWT };

const jwtSecret = "secretkey";

function generateJWT(payload: object): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

function parseJWT(token: string): jwt.JwtPayload | string | undefined {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error("JWT failed to be verified: ", error);
    return undefined
  }
}
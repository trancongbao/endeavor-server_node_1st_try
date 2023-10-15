import jwt from "jsonwebtoken";
import { createJSONRPCErrorResponse } from "json-rpc-2.0";

export { generateJWT, processJWT };

const jwtSecret = "secretkey";

function generateJWT(payload: object): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

/**
 * This middleware function extracts a JWT token from the request Authorization header.
 * It then parses and verifies the token.
 * If the token is invalid or an error occurs, it creates an appropriate JSON-RPC error response and ends the middleware stack.
 * If the token exists and is valid, it adds the token payload as a `user` field to the request.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {function} next - The callback to proceed with the middleware stack.
 * @returns {void}
 */
function processJWT(request: any, response: any, next: any): void {
  let authorizationHeader = request.headers.authorization as string | undefined;
  let body = request.body
  
  try {
  if (!authorizationHeader) {
    response.json(
      createJSONRPCErrorResponse(body.id, -33001, 'JWT Verification Failed: Missing Authorization header.')
    ) 
  } else {
        // Authorization header should have the form `Bearer Token`
        let token = authorizationHeader.split(' ')[1];
        if (token === 'null' || !token) {
          response.json(
            createJSONRPCErrorResponse(body.id, -33001, 'JWT Verification Failed: Missing Authorization header.')
          ) 
        }

        let verifiedUser = jwt.verify(token, 'secretKey');
        if (!verifiedUser) {
          response.json(
            createJSONRPCErrorResponse(body.id, -33001, 'JWT Verification Failed: Missing Authorization header.')
          ) 
        }

        request.user = verifiedUser;
        next();
      }      
  } catch (error) {
      response.json(
        createJSONRPCErrorResponse(body.id, -33001, 'JWT Verification Failed: Missing Authorization header.')
      )
  }
}
import jwt from 'jsonwebtoken';
import { JSONRPCServer, createJSONRPCErrorResponse } from "json-rpc-2.0";

export { verifyUserToken } 

function verifyUserToken(request: any, response: any, next: any) {
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
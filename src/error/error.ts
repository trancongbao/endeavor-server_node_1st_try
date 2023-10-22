import { JSONRPCID, createJSONRPCErrorResponse } from "json-rpc-2.0";

export { sendJsonRpcErrorResponse, JsonRpcErrorCodes };

function sendJsonRpcErrorResponse(response: any, id: JSONRPCID, code: any) {
  response.json(createJSONRPCErrorResponse(id, code, jsonRpcErrorCodes[code]));
}

const jsonRpcErrorCodes: Record<number, string> = {
  [-33000]: "Authentication failed: Unexpected error while verifying JWT token.",
  [-33001]: "Authentication failed: Missing Authorization header.",
  [-33002]: "Authentication failed: Missing JWT token.",
  [-33003]: "Authentication failed: Invalid JWT token.",
};

enum JsonRpcErrorCodes {
  Authorization_UnexpectedError = -33000,
  Authorization_AuthorizationHeaderMissing = -33001,
  Authorization_JwtTokenMissing = -33002,
  Authorization_JwtTokenExpired = -33003,
  Authorization_JwtTokenInvalid = -33003,
}

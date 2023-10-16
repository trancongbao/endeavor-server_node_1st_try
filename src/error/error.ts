import { JSONRPCID, createJSONRPCErrorResponse } from "json-rpc-2.0";

export {sendJSONRPCErrorResponse}

function sendJSONRPCErrorResponse(response: any, id: JSONRPCID, code: any) {
  response.json(
    createJSONRPCErrorResponse(id, code, jsonRpcErrorCodes[code])
  )
}

const jsonRpcErrorCodes: Record<number, string> = {
  [-33000]: 'JWT Verification Failed: Unexpected error.',
  [-33001]: 'JWT Verification Failed: Missing Authorization header.',
  [-33002]: 'JWT Verification Failed: Missing JWT token.',
  [-33003]: 'JWT Verification Failed: Invalid JWT token.'
};
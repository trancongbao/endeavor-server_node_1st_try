import { JSONRPCServer } from 'json-rpc-2.0';
import pgEndeavorDb from '../databases/postgres';
import { generateJWT } from '../jwt/jwt';
import 'scope-extensions-js';

export default new JSONRPCServer().apply(function () {
  this.addMethod('login', loginJsonRpcMethodHandler);
});

function loginJsonRpcMethodHandler({
  userType,
  username,
  password,
}: {
  userType: UserType;
  username: string;
  password: string;
}) {
  return pgEndeavorDb
    .oneOrNone(
      `SELECT * FROM ${userType} WHERE username = $1 AND password = $2`,
      [username, password]
    )
    .then((user) => {
      if (user) {
        const { password, ...userInfo } = user; // Remove password field
        return { jwt: generateJWT({ userType, ...userInfo }) };
      } else {
        console.info('Invalid username or password.');
        return { error: 'Invalid username or password.' };
      }
    })
    .catch((error) => {
      console.error('Database error:', error);
      return { error: 'An error occurred while processing your request.' };
    });
}

enum UserType {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

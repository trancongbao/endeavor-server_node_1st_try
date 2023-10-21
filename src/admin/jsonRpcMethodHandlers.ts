import { JSONRPCServer } from 'json-rpc-2.0';
import bcrypt from 'bcryptjs';
import pgEndeavorDb from '../databases/postgres';
import { TeacherInsertable, TeacherSelectable, db } from './kysely';

const jsonRpcMethodHandlers = new JSONRPCServer();

export default jsonRpcMethodHandlers;

jsonRpcMethodHandlers.addMethod('createTeacher', createTeacher);
jsonRpcMethodHandlers.addMethod(
  'read',
  ({ courseId }: { courseId: number }) => {
    const courseDetails = { id: courseId, name: 'Sample Course' };
    return courseDetails;
  }
);

jsonRpcMethodHandlers.addMethod(
  'update',
  ({ courseId }: { courseId: number }) => {
    const courseDetails = { id: courseId, name: 'Sample Course' };
    return courseDetails;
  }
);

jsonRpcMethodHandlers.addMethod(
  'delete',
  ({ courseId }: { courseId: number }) => {
    const courseDetails = { id: courseId, name: 'Sample Course' };
    return courseDetails;
  }
);

function createTeacher(teacher: TeacherInsertable) {
  const hasPassword = bcrypt.hash(teacher.password, 13, (passwordHash) => {
    db.insertInto('teacher')
      .values(teacher)
      .returningAll()
      .executeTakeFirstOrThrow();
    console.log(`User added: ${teacher}`);
    return 'User added successfully!';
  });
}

import { JSONRPCServer } from 'json-rpc-2.0';
import bcrypt from 'bcryptjs';
import { TeacherInsertable, TeacherSelectable, db } from './kysely';

export default new JSONRPCServer().apply(function () {
  this.addMethod('createTeacher', createTeacher);
  this.addMethod('readTeacher', readTeacher);
  this.addMethod('updateTeacher', updateTeacher);
  this.addMethod('deleteTeacher', deleteTeacher);
});

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

function readTeacher(teacherId: number) {}

function updateTeacher(teacherId: number) {}

function deleteTeacher(teacherId: number) {}

import { JSONRPCServer } from 'json-rpc-2.0';
import bcrypt from 'bcryptjs';
import {
  TeacherInsertable,
  TeacherSelectable,
  endeavorPostgresDB,
} from './kysely';
import 'scope-extensions-js';

export default new JSONRPCServer().apply(function () {
  this.addMethod('createTeacher', createTeacher);
  this.addMethod('readTeacher', readTeacher);
  this.addMethod('updateTeacher', updateTeacher);
  this.addMethod('deleteTeacher', deleteTeacher);
});

function createTeacher(teacher: TeacherInsertable) {
  bcrypt.hash(teacher.password, 13, (_, hashedPassword) => {
    teacher.password = hashedPassword;
  });

  return endeavorPostgresDB
    .insertInto('teacher')
    .values(teacher)
    .returningAll()
    .executeTakeFirstOrThrow()
    .also(function () {
      console.log(`Teacher added: ${JSON.stringify(teacher)}`);
    });
}

function readTeacher(teacherId: number) {}

function updateTeacher(teacherId: number) {}

function deleteTeacher(teacherId: number) {}

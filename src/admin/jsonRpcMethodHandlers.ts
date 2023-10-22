import 'scope-extensions-js';
import { JSONRPCServer } from 'json-rpc-2.0';
import bcrypt from 'bcryptjs';
import endeavorDB from './endeavorDB';
import { TeacherInsertable, TeacherSelectable } from './teacherTable';
import { StudentInsertable, StudentUpdatable } from './studentTable';

export default new JSONRPCServer().apply(function () {
  //Teacher
  this.addMethod('createTeacher', createTeacher);
  this.addMethod('readTeacher', readTeacher);
  this.addMethod('updateTeacher', updateTeacher);
  this.addMethod('deleteTeacher', deleteTeacher);
  //Teacher_Course

  //Student
  this.addMethod('createStudent', createStudent);
  this.addMethod('readStudent', readStudent);
  this.addMethod('updateStudent', updateStudent);
  this.addMethod('deleteStudent', deleteStudent);
  //Student_Course

  //Courses: CRUD
});

/*
 * Teacher
 */
function createTeacher(teacher: TeacherInsertable) {
  bcrypt.hash(teacher.password, 13, (_, hashedPassword) => {
    teacher.password = hashedPassword;
  });

  return endeavorDB
    .insertInto('teacher')
    .values(teacher)
    .returningAll()
    .executeTakeFirstOrThrow()
    .also(() => console.log(`Teacher created: ${JSON.stringify(teacher)}`));
}

function readTeacher(teacherId: number) {}

function updateTeacher(teacherId: number) {}

function deleteTeacher(teacherId: number) {}

/*
 * Student
 */
function createStudent(student: StudentInsertable) {
  bcrypt.hash(student.password, 13, (_, hashedPassword) => {
    student.password = hashedPassword;
  });

  return endeavorDB
    .insertInto('student')
    .values(student)
    .returningAll()
    .executeTakeFirstOrThrow()
    .also(() => console.log(`Student created: ${JSON.stringify(student)}`));
}

function readStudent({ username }: { username: string }) {
  return endeavorDB
    .selectFrom('student')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirstOrThrow();
}

function updateStudent(student: StudentUpdatable) {
  return endeavorDB
    .updateTable('student')
    .where('username', '=', student.username!!)
    .set(student)
    .returningAll()
    .executeTakeFirstOrThrow()
    .also(() => console.log(`Student updated: ${JSON.stringify(student)}`));
}

function deleteStudent({ username }: { username: string }) {}

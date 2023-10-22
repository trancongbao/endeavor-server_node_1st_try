import { JSONRPCServer } from 'json-rpc-2.0';
import 'scope-extensions-js';
import bcrypt from 'bcryptjs';
import endeavorDB from './endeavorDB';
import {
  TeacherInsertable as StudentInsertable,
  TeacherSelectable,
} from './teacherTable';

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
function createTeacher(teacher: StudentInsertable) {
  bcrypt.hash(teacher.password, 13, (_, hashedPassword) => {
    teacher.password = hashedPassword;
  });

  return endeavorDB
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
    .also(function () {
      console.log(`Student added: ${JSON.stringify(student)}`);
    });
}

function readStudent(teacherId: number) {}

function updateStudent(teacherId: number) {}

function deleteStudent(teacherId: number) {}

import 'scope-extensions-js';
import { JSONRPCServer } from 'json-rpc-2.0';
import {
  createTeacher,
  readTeacher,
  updateTeacher,
  deleteTeacher,
} from './teacherMethods';
import {
  createStudent,
  readStudent,
  updateStudent,
  deleteStudent,
} from './studentMethods';

/*
 * JSON-RPC Method Handlers
 */
export default new JSONRPCServer().apply(function () {
  //Teacher
  this.addMethod('createTeacher', createTeacher);
  this.addMethod('readTeacher', readTeacher);
  this.addMethod('updateTeacher', updateTeacher);
  this.addMethod('deleteTeacher', deleteTeacher);

  //Student
  this.addMethod('createStudent', createStudent);
  this.addMethod('readStudent', readStudent);
  this.addMethod('updateStudent', updateStudent);
  this.addMethod('deleteStudent', deleteStudent);

  //Courses: CRUD
});

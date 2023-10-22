import bcrypt from 'bcryptjs';
import endeavorDB from './endeavorDB';
import { TeacherInsertable, TeacherSelectable } from './teacherTable';

export function createTeacher(teacher: TeacherInsertable) {
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

export function readTeacher(teacherId: number) {}

export function updateTeacher(teacherId: number) {}

export function deleteTeacher(teacherId: number) {}

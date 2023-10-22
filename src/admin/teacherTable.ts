import { Insertable, Selectable, Updateable } from 'kysely';

export interface TeacherTable {
  username: string;
  password: string;
  surname: string;
  given_name: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  address: string;
  avatar: string;
}

export type TeacherSelectable = Selectable<TeacherTable>;
export type TeacherInsertable = Insertable<TeacherTable>;
export type TeacherUpdatable = Updateable<TeacherTable>;

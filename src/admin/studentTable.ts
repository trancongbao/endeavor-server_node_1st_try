import { Insertable, Selectable, Updateable } from 'kysely';

export interface StudentTable {
  username: string;
  password: string;
  surname: string;
  given_name: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  address: string;
  avatar: string;
  proficiency: number;
}

export type StudentSelectable = Selectable<StudentTable>;
export type StudentInsertable = Insertable<StudentTable>;
export type StudentUpdatable = Updateable<StudentTable>;

import { Generated, Insertable, Selectable, Updateable } from 'kysely';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export interface Database {
  teacher: TeacherTable;
}

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
export type PersonUpdatable = Updateable<TeacherTable>;

const dialect = new PostgresDialect({
  pool: new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'endeavor',
    max: 10,
  }),
});

export const endeavorPostgresDB = new Kysely<Database>({
  dialect,
});

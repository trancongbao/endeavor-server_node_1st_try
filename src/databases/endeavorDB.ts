import 'scope-extensions-js';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export default new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'endeavor',
  max: 10,
})
  .let((pool) => new PostgresDialect({ pool }))
  .let((dialect) => new Kysely<Database>({ dialect }));

interface Database {
  teacher: TeacherTable;
  student: StudentTable;
}

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

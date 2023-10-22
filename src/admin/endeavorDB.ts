import 'scope-extensions-js';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { TeacherTable } from './teacherTable';
import { StudentTable } from './studentTable';

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
  student: StudentTable
}

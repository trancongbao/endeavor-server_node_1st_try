import "scope-extensions-js";
import { Pool } from "pg";
import { Kysely, PostgresDialect, Generated, ColumnType } from "kysely";

export default new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "endeavor",
  max: 10,
})
  .let((pool) => new PostgresDialect({ pool }))
  .let((dialect) => new Kysely<Database>({ dialect }));

interface Database {
  teacher: TeacherTable;
  student: StudentTable;
  course: CourseTable;
  word: WordTable;
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

export interface CourseTable {
  id: Generated<number>;
  status: CourseStatus;
  title: string;
  level: number;
  summary?: string;
  description?: string;
  thumbnail?: string;
  updated_at: ColumnType<Date, string | undefined, never>;
}

enum CourseStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface WordTable {
  id: Generated<number>;
  word: string;
  definition: string;
  phonetic: string;
  part_of_speech: string;
  audio_uri: string;
  image_uri: string;
}

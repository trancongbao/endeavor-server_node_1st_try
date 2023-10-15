import pgPromise from "pg-promise";

export default pgPromise()({
  user: "postgres",
  host: "localhost",
  database: "endeavor",
  password: "postgres",
  port: 5432,
});
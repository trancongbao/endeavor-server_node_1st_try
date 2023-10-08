import express from "express";
import bodyParser from "body-parser";
import {default as userRouter} from "./user/router";
import {default as courseRouter} from "./course/router";

const app = express();

// Routers
app.use("/user", userRouter);
app.use("/course", courseRouter);

// Other Middlewares
app.use(bodyParser.json());

// Server
app.listen(3000, () => {
  console.log("Express server started on port 3000");
});
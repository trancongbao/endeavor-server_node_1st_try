import express from "express";
import {default as userRouter} from "./user/router";
import {default as courseRouter} from "./course/router";

const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use("/user", userRouter);
app.use("/course", courseRouter);

// Server
app.listen(3000, () => {
  console.log("Express server started on port 3000");
});
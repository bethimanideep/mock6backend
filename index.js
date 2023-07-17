const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { quizRouter } = require("./routes/quiz.router");
const port = process.env.PORT;

app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("", userRouter);
app.use("", quizRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at the port: ${port}`);
});

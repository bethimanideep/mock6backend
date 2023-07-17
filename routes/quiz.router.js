const express = require("express");
const quizRouter = express.Router();
const { QuizModel } = require("../models/quiz.model");
require("dotenv").config();

quizRouter.post("/createquiz", async (req, res) => {
  const payload = req.body;
  try {
    const quiz = new QuizModel(payload);
    await quiz.save();
    res.json({ message: "Quiz Created" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
});

quizRouter.get("/getquizes", async (req, res) => {
  try {
    const quizes = await QuizModel.find();
    if (!quizes[0]) return res.json({ message: "No quizes are available" });
    res.json(quizes);
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
});

quizRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await QuizModel.findOne({ _id: id });
    if (!quiz) return res.json({ message: "No quiz exists" });
    await QuizModel.findByIdAndDelete(id);
    res.json({
      message: "Successfully Deleted",
      quiz: quiz,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
});

quizRouter.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const quiz = await QuizModel.findOne({ _id: id });
    if (!quiz) return res.json({ message: "No quiz exists" });
    await QuizModel.findByIdAndUpdate(id, payload);
    res.json({
      message: "Successfully Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
});

module.exports = { quizRouter };

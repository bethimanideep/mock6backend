const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    creator: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: {
      type: [
        {
          title: { type: String },
          answerOptions: [{ type: String }],
          correctOptions: [{ type: Number }],
        },
      ],
    },
    leaderboard: {
      type: [
        {
          email: { type: String },
          score: { type: Number },
        },
      ],
    },
  },
  { versionKey: false }
);

const QuizModel = mongoose.model("Quize", quizSchema);

module.exports = { QuizModel };

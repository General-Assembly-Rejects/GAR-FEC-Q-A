/* eslint-disable no-console */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/REI', {
  useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(() => console.log('success connecting to REI mongoose db'))
  .catch(() => console.log('error connecting to REI mongoose db'));

const qaSchema = mongoose.Schema({
  questionAuthor: String,
  questionTitle: String,
  questionCreatedAt: Date,
  questionBody: String,
  answers: Number,
  answer: {
    answerTitle: String,
    answerAuthor: String,
    answerCreatedAt: Date,
    answerBody: String,
    answerHelpfulYes: Number,
    answerHelpfulNo: Number,
  },
});

const Qa = mongoose.model('Qa', qaSchema);

const findAllQuestions = (callback) => {
  Qa.find({}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
const addNewQuestion = (question, callback) => {
  Qa.create({
    questionAuthor: question.questionAuthor,
    questionTitle: question.questionTitle,
    questionCreatedAt: question.questionCreatedAt,
    questionBody: question.questionBody,
    answers: question.answers,
    answer: question.answer,
  }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const incrementAnswersValue = (id) => {
  Qa.findOneAndUpdate({ _id: id }, { $inc: { answers: 1 } }).exec();
};

const answerQuestion = (questionId, newAnswer, callback) => {
  Qa.findOneAndUpdate({ _id: questionId }, { $set: { answer: newAnswer } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      incrementAnswersValue(questionId);
      callback(null, results);
    }
  });
};

const incrementHelpfulYes = (questionId, callback) => {
  Qa.update({ _id: questionId }, { $inc: { 'answer.answerHelpfulYes': 1 } }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  Qa,
  findAllQuestions,
  addNewQuestion,
  answerQuestion,
  incrementHelpfulYes,
};

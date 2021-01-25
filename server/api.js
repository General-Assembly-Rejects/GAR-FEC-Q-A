/* eslint-disable no-unused-vars */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { findAllQuestions, addNewQuestion, answerQuestion } = require('../database/db/index.js');

const app = express.Router();
app.use(cors());
app.use(bodyParser.json());

app.get('/questions', (req, res) => {
  findAllQuestions((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/questions', (req, res) => {
  const question = {
    questionAuthor: req.body.questionAuthor,
    questionTitle: req.body.questionTitle,
    questionCreatedAt: req.body.questionCreatedAt,
    questionHelpfulYes: req.body.questionHelpfulYes,
    questionHelpfulNo: req.body.questionHelpfulNo,
    questionBody: req.body.questionBody,
    answers: req.body.answers,
    answer: req.body.answer,
  };
  addNewQuestion(question, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      findAllQuestions((err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  });
});

app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const answer = {
    answerTitle: req.body.answerTitle,
    answerBody: req.body.answerBody,
    answerAuthor: req.body.answerUserName,
    answerHelpfulYes: 0,
    answerHelpfulNo: 0
  };
  console.log('answer ', answer);
  console.log('req.body ', req.body)
  answerQuestion(id, answer, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      findAllQuestions((err, results) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(results);
        }
      });
    }
  });
});

module.exports = app;

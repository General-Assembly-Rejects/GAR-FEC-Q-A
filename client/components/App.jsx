import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
// eslint-disable-next-line import/no-named-as-default-member
import QuestionList from './QuestionList';

Modal.setAppElement('#qa-mount');

const App = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [questionAuthor, setQuestionAuthor] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [lastQuestion, setLastQuestion] = useState(null);

  const getQuestionList = () => {
    axios.get('http://18.216.184.226/:3003/api/questions')
      .then(({ data }) => {
        const questions = [];
        for (let i = 0; i < 5; i += 1) {
          questions.push(data[i]);
          setLastQuestion(i);
        }
        setQuestionList(questions);
      });
  };
  useEffect(() => {
    getQuestionList();
  }, []);

  const addQuestion = (question) => {
    axios.post('http://18.216.184.226/:3003/api/questions', question)
      .then(getQuestionList());
  };
  const processPost = (newQuestion) => {
    addQuestion(newQuestion);
  };
  const answerQuestion = (_id, answer) => {
    axios.put(`http://18.216.184.226/:3003/api/questions/${_id}`, answer)
      .then(getQuestionList());
  };

  return (
    <div>
      <button
        type="submit"
        className="askQuestion"
        onClick={() => setIsAskingQuestion(true)}
      >
        Ask a question
      </button>
      <h1>Questions &amp; Answers</h1>
      <Modal isOpen={isAskingQuestion} onRequestClose={() => setIsAskingQuestion(false)}>
        <h2>Ask a Question</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            processPost({ questionAuthor, questionTitle, questionBody });
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Question Title:
            <input
              type="text"
              name="questionTitle"
              onChange={(event) => setQuestionTitle(event.target.value)}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Question:
            <input
              type="text"
              name="questionBody"
              onChange={(event) => setQuestionBody(event.target.value)}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Nickname:
            <input
              type="text"
              name="username"
              onChange={(event) => setQuestionAuthor(event.target.value)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          </label>
          <button
            className="postQuestion"
            type="submit"
            onClick={() => processPost()}
          >
            Post question
          </button>
        </form>
        <button
          type="submit"
          onClick={() => setIsAskingQuestion(false)}
        >
          Close
        </button>
      </Modal>
      <QuestionList
        questionList={questionList}
        answerQuestion={answerQuestion}
      />
      <button
        type="submit"
        className="showMore"
        onClick={(event) => axios.get('http://18.216.184.226/:3003/api/questions')
          .then(({ data }) => {
            event.preventDefault();
            const newQuestions = [];
            for (let i = lastQuestion + 1; i < lastQuestion + 6; i += 1) {
              newQuestions.push(data[i]);
              setLastQuestion(i);
            }
            setQuestionList(newQuestions);
          })}
      >
        Show more
      </button>
    </div>
  );
};

App.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  questionList: PropTypes.arrayOf.isRequired,
};

export default App;

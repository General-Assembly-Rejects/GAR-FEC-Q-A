/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'; import PropTypes from 'prop-types';
import Modal from 'react-modal';

const QuestionList = ({ questionList, answerQuestion }) => {
  const [isAnsweringQuestion, setIsAnsweringQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answerTitle, setAnswerTitle] = useState(null);
  const [answerBody, setAnswerBody] = useState(null);
  const [answerUserName, setAnswerUserName] = useState(null);

  return (
    <div className="questionList">
      <div>
        {
        questionList.slice(0, 5).map((question) => (
          <div
            className="question"
            key={question._id}
          >
            <p className="numberOfAnswers">
              {question.answers}
              {' '}
              <div answersNumberText>
                answers
              </div>

            </p>
            <p className="author">{question.questionAuthor}</p>
            <p className="createdAt">{question.questionCreatedAt}</p>
            <p className="title">{question.questionTitle}</p>
            <p className="questionBody">{question.questionBody}</p>
            <div>
              <button
                type="submit"
                className="answerQuestion"
                onClick={() => {
                  setCurrentQuestion(question);
                  setIsAnsweringQuestion(question);
                }}
              >
                Answer the question
              </button>
              {
                    question.answer !== undefined ? (
                      <div className="answer">
                        <span>
                          <div className="answerAuthor">
                            {question.answer.answerAuthor}
                          </div>
                          <div className="answerTitle">
                            {question.answer.answerTitle}
                          </div>
                        </span>
                        <div className="answerBody">
                          {question.answer.answerBody}
                        </div>
                        <p>
                          Helpful?
                          <button
                            type="submit"
                            className="answerHelpfulYes"
                          >
                            Yes
                            {' '}
                            {question.answer.answerHelpfulYes}
                          </button>
                          <button
                            type="submit"
                            className="answerHelpfulNo"
                          >
                            No
                            {' '}
                            {question.answer.answerHelpfulNo}
                          </button>
                          <button
                            className="reportAsInappropriate"
                            type="submit"
                          >
                            Report as inappropriate
                          </button>
                        </p>

                      </div>
                    )
                      : <div />
                  }
            </div>
            <div>
              <Modal isOpen={isAnsweringQuestion} onRequestClose={() => setIsAnsweringQuestion(false)}>
                <p className="author">{currentQuestion.questionAuthor}</p>
                <p className="title">{currentQuestion.questionTitle}</p>
                <p className="createdAt">{currentQuestion.questionCreatedAt}</p>
                <p className="questionBody">{currentQuestion.questionBody}</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >

                  <label>
                    Answer Title:
                    <input
                      type="text"
                      name="questionTitle"
                      onChange={(event) => setAnswerTitle(event.target.value)}
                    />
                  </label>

                  <label>
                    Answer:
                    <input
                      type="text"
                      name="questionBody"
                      onChange={(event) => setAnswerBody(event.target.value)}
                    />
                  </label>
                  <label>
                    Nickname:
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => setAnswerUserName(event.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    onClick={() => {
                      answerQuestion(currentQuestion._id, {
                        answerTitle,
                        answerBody,
                        answerUserName,
                      });
                    }}
                  >
                    Answer question
                  </button>
                </form>
                <button
                  type="submit"
                  onClick={() => setIsAnsweringQuestion(false)}
                >
                  Close
                </button>
              </Modal>

            </div>

          </div>
        ))
        }
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  questionList: PropTypes.arrayOf.isRequired,
  answerQuestion: PropTypes.bool.isRequired,
};

export default QuestionList;

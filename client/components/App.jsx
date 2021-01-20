import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question';

const App = () => {
  const [questionList, setQuestionList] = useState([]);

  const getQuestionList = () => {
    axios.get('http://localhost:3007/api/questions')
      .then(({ data }) => {
        const firstQ = data[0];
        console.log('firstQ is :', firstQ);
        setQuestionList(firstQ);
      });
  };
  useEffect(() => {
    getQuestionList();
  }, []);

  return (
    <div>
      <h1>Questions and Answers</h1>
      <button
        type="submit"
        className="askQuestion"
      >
        Ask a question
      </button>
      <Question
        questionList={questionList}
      />
    </div>
  );
};

export default App;
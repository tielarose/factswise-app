/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';
import InputButton from './InputButton';
import './AssessmentQuestions.css';
import HandIcon from '../../../assets/hand-icon.png';
import ThinkingIcon from '../../../assets/thinking-icon.png';
import BrainIcon from '../../../assets/brain-icon.png';
import LightBulbIcon from '../../../assets/lightbulb-icon.png';
import QuestionMarkIcon from '../../../assets/question-mark-icon.png';

const allStudentResponses = [];

export default function AssessmentQuestions({ problemSetQuestions, setHasAnsweredAllQuestions }) {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('?');
  const [answerTime, setAnswerTime] = useState(0);
  const startTime = Date.now();

  // create InputButton components for the range of numbers specified, inclusive
  function createNumberButtons(firstNum, lastNum) {
    const allButtons = [];

    for (let i = firstNum; i <= lastNum; i += 1) {
      const button = (
        <InputButton
          setInputAnswer={setInputAnswer}
          setAnswerTime={setAnswerTime}
          startTime={startTime}
          value={i}
          key={`numberButton${i}`}
        />
      );

      allButtons.push(button);
    }

    return allButtons;
  }

  // runs when students click on the strategy they used
  // creates a problem_set_question_answer dictionary and moves
  // the student to the next question; if all questions have been answered,
  // stops and sends the data to the server
  function handleStrategyButtonClick(evt) {
    console.log('line 51');
    console.log(evt);
    const isFluentStrategy = (evt.target.value) === 'fluent_strategy';
    // console.log('strategy is', (evt.target.value))
    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: answerTime,
      is_fluent: isFluentStrategy && isCorrect,
    };

    // console.log(problemSetQuestionAnswer);

    allStudentResponses.push(problemSetQuestionAnswer);

    // if the student reaches the last question, stop and send the data to the server
    if (currentQuestionNum === (problemSetQuestions.length - 1)) {
      console.log('line 72');
      const formInputs = { student_id: currentUser.student_id, all_answers: allStudentResponses };

      fetch('/api/student/submitanswers', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: { 'Content-Type': 'application/json' },
      });
      setHasAnsweredAllQuestions(true);
    } else {
      setInputAnswer('');
      setCurrentQuestionNum(() => (currentQuestionNum + 1));
    }
  }
  return (
    <div className="assessment-container">
      <form>
        <label htmlFor="student-answer">
          {problemSetQuestions[currentQuestionNum]?.question_text}
          { ' ' }
          {' '}
          =
          {' '}
          { ' ' }
          <input
            name="student=answer"
            id="student-answer"
            type="text"
            value={inputAnswer}
            onChange={(evt) => setInputAnswer(evt.target.value)}
            // required
            disabled
          />
        </label>
        <button type="submit" className="button-yellow">Enter</button>
      </form>
      <div className="numbers-container">
        { createNumberButtons(0, 10)}
      </div>
      <div className="numbers-container">
        <button type="button" disabled aria-label="disabled placeholder button" className="invisible" />
        { createNumberButtons(11, 20) }
      </div>

      <div className="strategies-container">
        <h5>How did you get your answer?</h5>
        <div className="strategy-buttons-container">
          <button type="button" value="not_fluent_strategy" onClick={handleStrategyButtonClick}>
            <p>I counted with my fingers</p>
            <img src={HandIcon} alt="hand icon" className="strategy-icon" />
          </button>
          <button type="button" value="not_fluent_strategy" onClick={handleStrategyButtonClick}>
            <p>I counted in my head</p>
            <img src={ThinkingIcon} alt="thought bubble icon" className="strategy-icon" />
          </button>
          <button type="button" value="fluent_strategy" onClick={handleStrategyButtonClick}>
            <p>I used a special strategy</p>
            <img src={BrainIcon} alt="strategy brain icon" className="strategy-icon" />
          </button>
          <button type="button" value="fluent_strategy" onClick={handleStrategyButtonClick}>
            <p>I just knew it</p>
            <img src={LightBulbIcon} alt="light bulb icon" className="strategy-icon" />
          </button>
          <button type="button" value="not_fluent_strategy" onClick={handleStrategyButtonClick}>
            <p>I guessed</p>
            <img src={QuestionMarkIcon} alt="question mark icon" className="strategy-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

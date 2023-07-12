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
  const [inputAnswer, setInputAnswer] = useState('');
  const [answerTime, setAnswerTime] = useState(0);
  const startTime = Date.now();
  console.log('startTime is', startTime);

  // runs when students submit their numerical answer; captures the time taken to answer
  function handleNumberSubmit(evt) {
    evt.preventDefault();

    const endTime = Date.now();
    console.log('endTime is', endTime);
    const totalTime = endTime - startTime;
    console.log('totalTime is', totalTime);

    setAnswerTime(Math.round(totalTime / 100));

  }

  // runs when students click on the strategy they used
  // creates a problem_set_question_answer dictionary and moves 
  // the student to the next question; if all questions have been answered, 
  // stops and sends the data to the server
  function handleStrategyButtonClick(evt) {
    const isFluentStrategy = (evt.target.value) === 'fluent_strategy'
    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: answerTime,
      is_fluent: isFluentStrategy && isCorrect,
    };

    console.log(problemSetQuestionAnswer);

    allStudentResponses.push(problemSetQuestionAnswer);

  // if the student reaches the last question, stop and send the data to the server
    if (currentQuestionNum === (problemSetQuestions.length - 1)) {
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
      <form onSubmit={handleNumberSubmit}>
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
            required
          />
        </label>
        <button type="submit" className="button-yellow">Enter</button>
      </form>
      <div className="numbers-container">
        <InputButton setInputAnswer={setInputAnswer} value={0} />
        <InputButton setInputAnswer={setInputAnswer} value={1} />
        <InputButton setInputAnswer={setInputAnswer} value={2} />
        <InputButton setInputAnswer={setInputAnswer} value={3} />
        <InputButton setInputAnswer={setInputAnswer} value={4} />
        <InputButton setInputAnswer={setInputAnswer} value={5} />
        <InputButton setInputAnswer={setInputAnswer} value={6} />
        <InputButton setInputAnswer={setInputAnswer} value={7} />
        <InputButton setInputAnswer={setInputAnswer} value={8} />
        <InputButton setInputAnswer={setInputAnswer} value={9} />
        <InputButton setInputAnswer={setInputAnswer} value={10} />
      </div>
      <div className="numbers-container">
        <button type="button" disabled aria-label="disabled placeholder button" className="invisible" />
        <InputButton setInputAnswer={setInputAnswer} value={11} />
        <InputButton setInputAnswer={setInputAnswer} value={12} />
        <InputButton setInputAnswer={setInputAnswer} value={13} />
        <InputButton setInputAnswer={setInputAnswer} value={14} />
        <InputButton setInputAnswer={setInputAnswer} value={15} />
        <InputButton setInputAnswer={setInputAnswer} value={16} />
        <InputButton setInputAnswer={setInputAnswer} value={17} />
        <InputButton setInputAnswer={setInputAnswer} value={18} />
        <InputButton setInputAnswer={setInputAnswer} value={19} />
        <InputButton setInputAnswer={setInputAnswer} value={20} />
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

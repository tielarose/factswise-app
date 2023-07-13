/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import HandIcon from '../../../assets/hand-icon.png';
import ThinkingIcon from '../../../assets/thinking-icon.png';
import BrainIcon from '../../../assets/brain-icon.png';
import LightBulbIcon from '../../../assets/lightbulb-icon.png';
import QuestionMarkIcon from '../../../assets/question-mark-icon.png';
import { AppContext } from '../../Context';

const allStudentResponses = [];

export default function StrategyButtonsContainer({
  problemSetQuestions, currentQuestionNum, setHasAnsweredAllQuestions,
  setInputAnswer, setDisplayNumberButtons, setCurrentQuestionNum,
  inputAnswer, answerTime,
}) {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;

  function handleStrategyButtonClick(evt) {
    const buttonValue = (evt.target.parentNode.value || evt.target.value);
    const isFluentStrategy = buttonValue === 'fluent_strategy';
    const question = problemSetQuestions[currentQuestionNum];
    const isCorrect = parseInt(inputAnswer, 10) === question.answer_as_int;

    const problemSetQuestionAnswer = {
      problem_set_question_id: question.question_id,
      student_answer: parseInt(inputAnswer, 10),
      is_correct: isCorrect,
      time_to_answer: answerTime,
      is_fluent: isFluentStrategy && isCorrect,
    };

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
      setInputAnswer('?');
      setDisplayNumberButtons(true);
      setCurrentQuestionNum(() => (currentQuestionNum + 1));
    }
  }

  const strategyButtonInfo = [
    {
      buttonOrder: 1,
      buttonText: 'I counted with my fingers',
      buttonIcon: HandIcon,
      iconDesc: 'hand icon',
      buttonValue: 'not_fluent_strategy',
    },
    {
      buttonOrder: 2,
      buttonText: 'I counted in my head',
      buttonIcon: ThinkingIcon,
      iconDesc: 'thought bubble icon',
      buttonValue: 'not_fluent_strategy',
    },
    {
      buttonOrder: 3,
      buttonText: 'I used a special strategy',
      buttonIcon: BrainIcon,
      iconDesc: 'brain icon',
      buttonValue: 'fluent_strategy',
    },
    {
      buttonOrder: 4,
      buttonText: 'I just knew it',
      buttonIcon: LightBulbIcon,
      iconDesc: 'light bulb icon',
      buttonValue: 'fluent_strategy',
    },
    {
      buttonOrder: 5,
      buttonText: 'I guessed',
      buttonIcon: QuestionMarkIcon,
      iconDesc: 'question mark icon',
      buttonValue: 'not_fluent_strategy',
    },
  ];

  const strategyButtons = strategyButtonInfo
    .sort((a, b) => a.buttonOrder - b.buttonOrder)
    .map(({
      buttonText, buttonIcon, iconDesc, buttonValue, buttonOrder,
    }) => (
      <button type="button" value={buttonValue} onClick={handleStrategyButtonClick} key={`strategyButton${buttonOrder}`}>
        <p>{ buttonText}</p>
        <img src={buttonIcon} alt={iconDesc} className="strategy-icon" />
      </button>
    ));

  return (
    <div className="StrategyButtonsContainer">
      <h5>How did you get your answer?</h5>
      <div className="strategy-buttons">
        {strategyButtons}
      </div>
    </div>
  );
}

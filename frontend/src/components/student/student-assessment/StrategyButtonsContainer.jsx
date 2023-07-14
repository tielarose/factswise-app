/* eslint-disable react/prop-types */
import React from 'react';
import HandIcon from '../../../assets/hand-icon.png';
import ThinkingIcon from '../../../assets/thinking-icon.png';
import BrainIcon from '../../../assets/brain-icon.png';
import LightBulbIcon from '../../../assets/lightbulb-icon.png';
import QuestionMarkIcon from '../../../assets/question-mark-icon.png';

export default function StrategyButtonsContainer({
  handleStrategyButtonClick,
}) {
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

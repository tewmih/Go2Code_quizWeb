import React, { useState, useEffect } from "react";
import "./card.css";

function Card(props) {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectAnswer = (index, choice) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = choice;
    setUserAnswers(updatedAnswers);
    props.setUserAnswer(updatedAnswers); // Update the parent component with the latest answers
  };

  return (
    <React.Fragment>
      {props.questions.map((questionElement, index) => (
        <div className="cardContainer" key={index}>
          <div className="left">
            <p className="number">{index + 1}</p>
          </div>
          <div className="right">
            <div className="upper">
              <p className="question">{questionElement.question}</p>
            </div>
            <div className="lower">
              {questionElement.choices.map((choice, index2) => (
                <div className="option2" key={index2}>
                  <input
                    type="radio"
                    name={`question_${index}`}
                    checked={userAnswers[index] === choice}
                    onChange={() => handleSelectAnswer(index, choice)}
                  />
                  <p
                    className="text"
                    onClick={() => handleSelectAnswer(index, choice)}
                  >
                    {choice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Card;

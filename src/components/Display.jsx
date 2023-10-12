import React from "react";
import { useSelector } from "react-redux";

const Display = () => {
  const workingValue = useSelector((state) => state.calculator.workingValue);
  const answer = useSelector((state) => state.calculator.answer);

  // console.log(workingValue);

  return (
    <div className="display">
      <div className="displayContainer">
        <div className="working">{workingValue}</div>
        <div className="answer">{answer}</div>
      </div>
    </div>
  );
};

export default Display;

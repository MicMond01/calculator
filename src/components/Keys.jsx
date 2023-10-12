import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkingValue,
  clearWorkingValue,
  calculateAnswer,
  backspaceValue,
} from "../redux/math";
// import backspace from "../assets/backspace.png";

const keys = {
  numbs: ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  sign: ["Ac", "Bs", "/", "*", "-", "+", "="],
};

const Keys = () => {
  const workingValue = useSelector((state) => state.calculator.workingValue);
  const dispatch = useDispatch();
  const reversekeys = keys.numbs.slice().reverse();

  const topSign = keys.sign.slice(0, 3);
  const sideSign = keys.sign.slice(3, 7);

  const specialKeys = ["+", "="];

  const handleClick = (value) => {
    if (
      (workingValue.length === 0 && (value === "0" || isOperator(value))) ||
      (isOperator(workingValue[workingValue.length - 1]) && isOperator(value))
    ) {
      // Ignore consecutive "0" clicks and consecutive operator clicks
      return;
    } else if (value === "=") {
      dispatch(calculateAnswer());
    } else if (value === "Ac") {
      dispatch(clearWorkingValue());
    } else if (value === "Bs") {
      dispatch(backspaceValue());
    } else {
      // If it's not an operator or a special command, update the working value
      dispatch(updateWorkingValue(value));
    }
  };

  const isOperator = (value) => {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(value);
  };

  return (
    <div className="keys">
      <div className="col">
        <div className="signkeys">
          {topSign.map((value, index) => (
            <div
              style={{
                backgroundColor: value.includes("/") ? "#005db2" : "#606060",
                color: value.includes("/") ? "#29a8ff" : "#a4a4a4",
              }}
              className="topSigns"
              key={index}
              onClick={() => handleClick(value)}
            >
              {value}
            </div>
          ))}
        </div>

        <div className="numberKeys">
          {reversekeys.map((value, index) => (
            <div
              style={{ width: value.includes("0") ? "132px" : "62px" }}
              className="numbers"
              key={index}
              onClick={() => handleClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="sideSign">
        {sideSign.map((value, index) => (
          <div
            style={{
              height: specialKeys.includes(value) ? "103px" : "62px",
            }}
            className="signs"
            key={index}
            onClick={() => handleClick(value)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keys;

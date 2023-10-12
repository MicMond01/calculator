import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "calculator",
  initialState: {
    workingValue: [],
    answer: "",
  },
  reducers: {
    updateWorkingValue: (state, action) => {
      state.workingValue.push(action.payload);
      if (state.workingValue[0] === "0") {
        return "hh";
      }
      // console.log(state.workingValue);
    },
    clearWorkingValue: (state) => {
      state.workingValue = [];
      state.answer = "";
    },
    backspaceValue: (state) => {
      state.workingValue.splice(-1);
    },
    calculateAnswer: (state) => {
      try {
        const inputExpression = state.workingValue.join("");
        // console.log("Input Expression:", inputExpression);

        // Split the expression based on operators
        const operators = ["+", "-", "*", "/"];

        const operatorPattern = operators
          .map((operator) => "\\" + operator)
          .join("|");
        const operatorRegex = new RegExp(operatorPattern);
        const parts = inputExpression.split(operatorRegex);

        // Initialize the result with the first number
        let result = parseFloat(parts[0]) || 0;

        // Perform the calculation based on the operators
        for (let i = 1; i < parts.length; i++) {
          const operator = inputExpression.charAt(parts[i - 1].length);
          const operand = parseFloat(parts[i]) || 0;

          if (operator === "+") {
            result += operand;
          } else if (operator === "-") {
            result -= operand;
          } else if (operator === "*") {
            result *= operand;
          } else if (operator === "/") {
            if (operand !== 0) {
              result /= operand;
            } else {
              state.answer = "Error: Division by zero";
              return;
            }
          }
        }

        state.answer = result.toString();
        state.workingValue = [];
      } catch (error) {
        // console.error("Error:", error);
        state.answer = "Error: Invalid expression";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearWorkingValue,
  updateWorkingValue,
  calculateAnswer,
  backspaceValue,
} = counterSlice.actions;

export default counterSlice.reducer;

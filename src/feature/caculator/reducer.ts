import { CalculatorAction, CalculatorState } from "./type";

export const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case "input number": {
      if (state.operand) {
        return {
          ...state,
          expression: state.expression + state.operand + state.operator,
          operand: action.payload,
          operator: null,
        };
      }
      return {
        ...state,
        operand: state.operand * 10 + action.payload,
      };
    }

    case "input operator": {
      if (!state.operand) {
        return state;
      } else {
        return {
          ...state,
          operator: action.payload,
        };
      }
    }

    case "c": {
      return {
        ...state,
        operand: 0,
      };
    }

    case "ac": {
      return {
        expression: "",
        operand: 0,
        operator: null,
      };
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};

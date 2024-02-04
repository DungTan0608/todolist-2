export type CalculatorAction =
  | { type: "input number"; payload: number }
  | { type: "input operator"; payload: "+" | "-" | "*" | "/" | "%" | "!" }
  | { type: "calculate" }
  | { type: "c" }
  | { type: "ac" };

export type CalculatorState = {
  expression: string;
  operator: string | null;
  operand: number;
};

export type CaulatorContextObject = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
};

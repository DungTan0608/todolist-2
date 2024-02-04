export type TodoItem = {
  id: number;
  todo: string;
  completed: boolean;
  color?: Color;
};

export type TodoFilter = {
  status: Status;
  colors: Color[];
};

export type Status = "all" | "active" | "complete";

export type Color = "green" | "purple" | "orange";

export type TodoAction =
  | { type: "set data"; payload: { items: TodoItem[] } }
  | { type: "add new todo"; payload: { content: string } }
  | { type: "toggle todo status"; payload: { id: number } }
  | { type: "delete todo"; payload: { id: number } }
  | { type: "update todo color"; payload: { id: number; color: Color } }
  | { type: "mark all todo complete" }
  | { type: "clear all todo completed" }
  | { type: "filter by status"; payload: { status: Status } }
  | { type: "filter by colors"; payload: { colors: Color[] } };

export type TodoState = {
  loading: boolean;
  items: TodoItem[];
  filter: TodoFilter;
};

export type TodoContextObject = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};

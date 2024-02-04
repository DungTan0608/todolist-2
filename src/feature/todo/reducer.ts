import { TodoAction, TodoState } from "./types";

export const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "set data": {
      return {
        ...state,
        loading: false,
        items: action.payload.items,
      };
    }

    case "add new todo": {
      const newTodo = {
        id: Date.now(),
        todo: action.payload.content,
        completed: false,
      };

      return {
        ...state,
        items: [newTodo, ...state.items],
      };
    }

    case "toggle todo status": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, completed: !item.completed }
          : item
      );

      return {
        ...state,
        items: newItems,
      };
    }

    case "update todo color": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, color: action.payload.color }
          : item
      );

      return {
        ...state,
        items: newItems,
      };
    }

    case "delete todo": {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: newItems,
      };
    }

    case "filter by status": {
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.payload.status,
        },
      };
    }

    case "filter by colors": {
      return {
        ...state,
        filter: {
          ...state.filter,
          colors: action.payload.colors,
        },
      };
    }

    case "mark all todo complete": {
      const newItems = state.items.map((item) => ({
        ...item,
        completed: true,
      }));

      return {
        ...state,
        items: newItems,
      };
    }

    case "clear all todo completed": {
      const newItems = state.items.filter((item) => !item.completed);

      return {
        ...state,
        items: newItems,
      };
    }

    default:
      throw new Error("Action type not supported");
  }
};

import {
  createContext,
  useReducer,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { TodoContextObject } from "./types";
import { todoReducer } from "./reducer";

export const TodoContext = createContext<TodoContextObject>(
  {} as TodoContextObject
);

const TodoProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    todoReducer,
    {
      loading: true,
      items: [],
      filter: {
        status: "all",
        colors: [],
      },
    }
    // (initialState) => {
    //   const data = localStorage.getItem("todo");

    //   if (data) {
    //     return JSON.parse(data);
    //   } else {
    //     return initialState;
    //   }
    // }
  );
  const {
    isLoading,
    isError,
    data = {
      todos: [],
    },
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return fetch("https://dummyjson.com/todos/user/48").then((res) => res.json());
    },
  });

  // useEffect(() => {
  //   fetch("https://dummyjson.com/todos/user/26")
  //     .then((res) => res.json())
  //     .then(({ todos, total, skip, limit }) => {
  //       dispatch({ type: "set data", payload: { items: todos } });
  //     });
  // }, []);

  return (
    <TodoContext.Provider
      value={{
        state: { ...state, loading: isLoading, items: data.todos },
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

import { useContext, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { Color, Status } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

let mounted = false;

export const useTodo = () => {
  const { state, dispatch } = useContext(TodoContext);
  const client = useQueryClient();
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (todo: string) => {
      return fetch(`https://dummyjson.com/todos/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo,
          complete: false,
          userId: 48,
        }),
      }).then((res) => res.json());
    },
    onSettled(todo, variables, context) {
      //lay du lieu hien co trong text
      const data = client.getQueryData(["todos"]);
      // console.log(todos)
      client.setQueryData(["todos"], {
        ...data,
        todos: [todo, ...data.todos],
        total: data.total + 1,
      });
    },
  });
  const { mutate: deleteTodo, isPending: isDeleteting } = useMutation({
    mutationFn: (id: number) => {
      return fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    onSettled(todo, error, id, context) {
      const data = client.getQueryData(["todos"]);
      client.setQueryData(["todos"], {
        ...data,
        todos: data.todos.filter((item: { id: number }) => item.id != id),
        total: data.total - 1,
      });
    },
  });

  // completeall

  //deletec all compleate

  // Chay khi state thay doi
  // Dong bo trang thai danh sach cong viec vao localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todo", JSON.stringify(state));
    } else {
      mounted = true;
    }
  }, [state]);

  const add = (content: string) => {
    create(content);
    // dispatch({ type: "add new todo", payload: { content } });
  };

  const remove = (id: number) => {
    deleteTodo(id);
    // dispatch({ type: "delete todo", payload: { id } });
  };
  const toggleStatus = (id: number) => {
    // dispatch({
    //   type: "toggle todo status",
    //   payload: { id },
    // });
  };

  const changeColor = (id: number, color: Color) => {
    dispatch({ type: "update todo color", payload: { id, color } });
  };

  const filterStatus = (status: Status) => {
    dispatch({ type: "filter by status", payload: { status } });
  };

  const filterColors = (colors: Color[]) => {
    dispatch({ type: "filter by colors", payload: { colors } });
  };

  const completeAll = () => {
    // dispatch({ type: "mark all todo complete" });
  };

  const deleteComplete = () => {
    // dispatch({ type: "clear all todo completed" });
  };

  const pendingTasks = state.items.filter((item) => !item.completed).length;

  const filteredStatus =
    state.filter.status === "all"
      ? state.items
      : state.filter.status === "complete"
      ? state.items.filter((item) => item.completed)
      : state.items.filter((item) => !item.completed);

  const filteredColors =
    state.filter.colors.length === 0
      ? filteredStatus
      : filteredStatus.filter(
          (item) => item.color && state.filter.colors.includes(item.color)
        );

  return {
    ...state,
    pendingTasks,
    items: filteredColors,
    add,
    remove,
    toggleStatus,
    changeColor,
    completeAll,
    deleteComplete,
    filterStatus,
    filterColors,
  };
};
function onSettled(todo: any, error: any, id: any, context: any) {
  throw new Error("Function not implemented.");
}

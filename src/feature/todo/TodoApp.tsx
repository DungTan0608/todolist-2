import React, { FormEvent, FormEventHandler, useState } from "react";
import { useTodo } from "./hook";
import { Color, Status } from "./types";

const TodoApp = () => {
  const {
    loading,
    items,
    filter,
    pendingTasks,
    add,
    remove,
    toggleStatus,
    changeColor,
    completeAll,
    deleteComplete,
    filterStatus,
    filterColors,
  } = useTodo();
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    add(content);
  };

  const handleChangeStatus = (e: FormEvent<HTMLFormElement>) => {
    filterStatus(e.target.value! as Status);
  };

  return (
    <div>
      <h1>TodoApp</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {loading ? (
        <ul>
          <li>Dang tai du lieu</li>
        </ul>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleStatus(item.id)}
              />
              {item.todo}{" "}
              <select
                value={item.color}
                onChange={(e) => changeColor(item.id, e.target.value as Color)}
              >
                <option></option>
                <option value={"green"}>Green</option>
                <option value={"purple"}>Purple</option>
                <option value={"orange"}>Orange</option>
              </select>
              <button onClick={() => remove(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={completeAll}>Mark all complete</button>
        <button onClick={deleteComplete}>Delete all complete</button>
      </div>
      <div>Remaining tasks: {pendingTasks}</div>

      <form onChange={handleChangeStatus}>
        <input
          checked={filter.status == "all"}
          name="status"
          type="radio"
          id="all"
          value="all"
        />
        <label htmlFor="all">All</label>
        <input
          checked={filter.status == "complete"}
          name="status"
          type="radio"
          id="complete"
          value="complete"
        />
        <label htmlFor="complete">Complete</label>
        <input
          checked={filter.status == "active"}
          name="status"
          type="radio"
          id="active"
          value="active"
        />
        <label htmlFor="active">Active</label>
      </form>
    </div>
  );
};

export default TodoApp;

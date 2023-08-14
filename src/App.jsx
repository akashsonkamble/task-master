import React, { useContext } from "react";
import TaskList from "./components/Tasks/TaskList/TaskList";
import TaskInput from "./components/Tasks/TaskInput/TaskInput";
import "./App.css";
import Header from "./components/Header/Header";
import TaskContext from "./store/task-context";
import Pagination from "./components/pagination/Pagination";

const App = () => {
  const taskCtx = useContext(TaskContext);

  let content = (
    <p style={{ textAlign: "center" }}>No tasks found. Maybe add one?</p>
  );

  if (taskCtx.tasks.length > 0) {
    content = (
      <>
        <TaskList />
        <Pagination />
      </>
    );
  }

  return (
    <>
      <section id="task-form">
        <Header />
        <TaskInput />
      </section>
      <section id="tasks">{content}</section>
    </>
  );
};

export default App;

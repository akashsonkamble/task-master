import React, { useContext, useState } from "react";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import TaskContext from "../../../store/task-context";
import classes from "./TaskInput.module.css";

const TaskInput = () => {
  const taskCtx = useContext(TaskContext);
  const [task, setTask] = useState("");
  const [isValid, setIsValid] = useState(true);


  const taskInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setTask(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      setIsValid(false);
      return;
    }
    taskCtx.addTask(task);
    setTask("");
  };

  return (
    <Card>
      <form onSubmit={formSubmitHandler}>
        <div
          className={`${classes["form-control"]} ${
            !isValid && classes.invalid
          }`}
        >
          <label>Task</label>
          <input type="text" value={task} onChange={taskInputChangeHandler} />
        </div>
        <Button type="submit">Add Task</Button>
      </form>
    </Card>
  );
};

export default TaskInput;

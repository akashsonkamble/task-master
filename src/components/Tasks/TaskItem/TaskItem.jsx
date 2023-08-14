import { useContext, useState } from "react";
import Button from "../../UI/Button/Button";
import TaskContext from "../../../store/task-context";
import classes from "./TaskItem.module.css";

const TaskItem = ({ task }) => {
  const taskCtx = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const editTaskHandler = () => {
    if (isEditing) {
      taskCtx.updateTask(task.id, updatedText);
    }
    setIsEditing(!isEditing);
  };

  const deleteTaskHandler = () => {
    taskCtx.deleteTask(task.id);
  };

  const textChangeHandler = (event) => {
    setUpdatedText(event.target.value);
  };

  return (
      <li className={classes["task-item"]}>
        {isEditing ? (
          <input type="text" value={updatedText} onChange={textChangeHandler} />
        ) : (
          <span>{task.text}</span>
        )}
          <Button onClick={editTaskHandler}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button onClick={deleteTaskHandler}>Delete</Button>
      </li>
  );
};

export default TaskItem;

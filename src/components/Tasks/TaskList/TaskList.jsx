import { useContext } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskContext from "../../../store/task-context";
import classes from "./TaskLIst.module.css";

const TaskList = () => {
  const taskCtx = useContext(TaskContext);

  const startIndex =
    taskCtx.currentPage * taskCtx.tasksPerPage - taskCtx.tasksPerPage;

  const endIndex = startIndex + taskCtx.tasksPerPage;

  const tasksToShow = taskCtx.tasks.slice(startIndex, endIndex);

  return (
    <ul className={classes["task-list"]}>
      {tasksToShow.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;

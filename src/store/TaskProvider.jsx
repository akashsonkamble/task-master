import { useReducer } from "react";
import TaskContext from "./task-context";

const defaultTaskState = {
  tasks: [],
  currentPage: 1,
  tasksPerPage: 3,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        tasks: [...state.tasks, { id: Date.now(), text: action.task }],
      };

    case "REMOVE":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };

    case "UPDATE":
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.id ? { ...task, text: action.newText } : task
      );
      return {
        tasks: updatedTasks,
      };

    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.page,
      };

    default:
      return defaultTaskState;
  }
};

const TaskProvider = ({ children }) => {
  const [taskState, dispatchTaskAction] = useReducer(
    taskReducer,
    defaultTaskState
  );

  // console.log("taskState:", taskState);

  const addTaskHandler = (task) => {
    dispatchTaskAction({ type: "ADD", task: task });
    const newTotalTasks = taskState.tasks.length + 1;
    const newTotalPages = Math.ceil(newTotalTasks / 3);

    const updatedPage = Math.min(newTotalPages, taskState.currentPage);

    dispatchTaskAction({ type: "SET_PAGE", page: updatedPage });
  };

  const deleteTaskHandler = (id) => {
    dispatchTaskAction({ type: "REMOVE", id: id });

    const currentPageTasks = taskState.tasks.slice(
      (taskState.currentPage - 1) * 3,
      taskState.currentPage * 3
    );

    const newTotalTasks = taskState.tasks.length + 1;
    const newTotalPages = Math.ceil(newTotalTasks / 3);

    const updatedPage = Math.min(newTotalPages, taskState.currentPage);

    dispatchTaskAction({ type: "SET_PAGE", page: updatedPage });

    if (currentPageTasks.length === 1 && taskState.currentPage > 1) {
      dispatchTaskAction({ type: "SET_PAGE", page: taskState.currentPage - 1 });      
    }
  };

  const updateTaskHandler = (id, newText) => {
    dispatchTaskAction({ type: "UPDATE", id: id, newText: newText });

    const newTotalTasks = taskState.tasks.length + 1;
    const newTotalPages = Math.ceil(newTotalTasks / 3);

    const updatedPage = Math.min(newTotalPages, taskState.currentPage);

    dispatchTaskAction({ type: "SET_PAGE", page: updatedPage });
  };

  const setPageHandler = (page) => {
    dispatchTaskAction({ type: "SET_PAGE", page: page });
  };

  const taskContext = {
    tasks: taskState.tasks,
    currentPage: taskState.currentPage,
    // tasksPerPage: taskState.tasksPerPage,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    updateTask: updateTaskHandler,
    setPage: setPageHandler,
    tasksPerPage: 3,
  };

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;

import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  currentPage: 1,
  tasksPerPage: 3,
  addTask: (task) => {},
  deleteTask: (id) => {},
  updateTask: (id, newText) => {},
  setPage: (page) => {},
});


export default TaskContext;

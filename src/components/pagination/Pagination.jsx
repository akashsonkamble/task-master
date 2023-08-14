import React, { useContext } from "react";
import TaskContext from "../../store/task-context";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const taskCtx = useContext(TaskContext);

  const totalPages = Math.ceil(taskCtx.tasks.length / taskCtx.tasksPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className={classes.pagination}>
      {taskCtx.currentPage > 1 && (
        <span onClick={() => taskCtx.setPage(taskCtx.currentPage - 1)}>
          prev
        </span>
      )}
      {pageNumbers.map((pageNumber) => (
        <span
          key={pageNumber}
          className={pageNumber === taskCtx.currentPage ? classes.active : ""}
          onClick={() => taskCtx.setPage(pageNumber)}
        >
          {pageNumber}
        </span>
      ))}
      {taskCtx.currentPage < totalPages && (
        <span onClick={() => taskCtx.setPage(taskCtx.currentPage + 1)}>
          next
        </span>
      )}
    </div>
  );
};

export default Pagination;

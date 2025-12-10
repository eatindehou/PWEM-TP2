import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

function TaskList(props) {

  const { toggleTask, deleteTask } = useTasks();
  return (
    <div className="todo-list">
      {props.tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          date={task.due_date}
          completed={task.is_completed === 1}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

      ))}
    </div>
  );
}

export default TaskList;

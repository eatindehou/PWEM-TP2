import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

function TaskList() {

  const { tasks, loading, error, loadTasks, toggleTask } = useTasks();
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TaskItem
          id={task.id}
          title={task.title}
          date={task.due_date}
          completed={task.is_completed === 1}
          toggleTask={toggleTask}
        />

      ))}
    </div>
  );
}

export default TaskList;

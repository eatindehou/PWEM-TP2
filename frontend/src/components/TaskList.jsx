import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

function TaskList() {

    const { tasks, loading, error, loadTasks } = useTasks();
 return (
     <div className="todo-list">
        {tasks.map(task => (
        <TaskItem
          key={task.id}
          title={task.title}
          date={task.date}
          completed={task.completed}
        />
      ))}
     </div>
  );
}

export default TaskList;

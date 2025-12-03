import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

function TaskList() {

    const { tasks, loading, error, loadTasks } = useTasks();
 return (
<<<<<<< HEAD
     <div className="todo-list"></div>
=======
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
>>>>>>> df187aa758ed4351bf77e724f0e9f8e549988b34
  );
}

export default TaskList;

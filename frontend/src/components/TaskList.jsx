import React from "react";
import TaskItem from "./TaskItem";

function TaskList(props) {

  return (
    <div className="todo-list">
      {props.tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          date={task.due_date}
          completed={task.is_completed === 1}
          onToggle={props.onToggle}
        />

      ))}
    </div>
  );
}

export default TaskList;

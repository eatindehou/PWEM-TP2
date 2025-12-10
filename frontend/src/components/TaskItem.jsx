function TaskItem({ id, title, date, completed, toggleTask, deleteTask }) {
  return (
    <div className={`todo-item ${completed ? "todo-item--completed" : ""}`}>
      <input type="checkbox" className="todo-item__checkbox" checked={completed} onChange={() => toggleTask(id)} />
      <div className="todo-item__content">
        <div className="todo-item__title">{title}</div>
        <div className="todo-item__date">{date}</div>
      </div>
      <div className="todo-item__actions">
        <button className="todo-item__button todo-item__button--edit">Modifier</button>
        <button className="todo-item__button todo-item__button--delete" onClick={() => deleteTask(id)}>Supprimer</button>
      </div>
    </div>
  );
}

export default TaskItem;

function TaskItem({ id, title, date, completed, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${completed ? "todo-item--completed" : ""}`}>
      <input type="checkbox" className="todo-item__checkbox" checked={completed} onChange={() => onToggle(id)} />
      <div className="todo-item__content">
        <div className="todo-item__title">{title}</div>
        <div className="todo-item__date">{date}</div>
      </div>
      <div className="todo-item__actions">
        <button className="todo-item__button todo-item__button--edit">Modifier</button>
        <button className="todo-item__button todo-item__button--delete" onClick={() => onDelete(id)}>Supprimer</button>
      </div>
    </div>
  );
}

export default TaskItem;

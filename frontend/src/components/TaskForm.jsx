import { useState } from 'react'

function TaskForm(props) {;
  const [title, setTitle] = useState('');
  const [dueDate, setdueDate] = useState('');
  return (
    <form className="todo-form">
      <div className="todo-form__group">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-form__input"
          type="text"
          id="item"
          placeholder="Nouvelle tâche"
        />
        <input
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
          className="todo-form__date"
          type="date"
          id="date"
        />
        <button onClick={(e) => {
          e.preventDefault();
          props.onAdd(title, dueDate);
          setTitle('');
          setdueDate('');
        }} className="todo-form__button" type="submit" id="ajout">
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

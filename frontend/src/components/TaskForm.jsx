function TaskForm() {
 return (
    <form className="todo-form">
      <div className="todo-form__group">
        <input
          className="todo-form__input"
          type="text"
          id="item"
          placeholder="Nouvelle tâche"
        />
        <input
          className="todo-form__date"
          type="date"
          id="date"
        />
        <button className="todo-form__button" type="submit" id="ajout">
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

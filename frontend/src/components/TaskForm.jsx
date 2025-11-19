function TaskForm() {
 return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__group">
        <input
          className="todo-form__input"
          type="text"
          id="item"
          placeholder="Nouvelle tâche"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          className="todo-form__date"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="todo-form__button" type="submit" id="ajout">
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

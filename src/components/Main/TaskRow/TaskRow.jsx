import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import EditFields from '../EditFields/EditFields';
import './TaskRow.scss';

function TaskRow({ todo, toggleTodo, deleteTodo, editTodo, projectId, onUpdate, projectManager }) {
  const handleToggleComplete = (e) => {
    e.stopPropagation();
    toggleTodo(projectId, todo.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTodo(projectId, todo.id);
    onUpdate();
  };

  return (
    <div className="task-row">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        onClick={(e) => e.stopPropagation()}
        className="task-row__checkbox"
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title} {todo.dueDate && `(${new Date(todo.dueDate).toLocaleDateString('ru-RU')})`}
      </span>
      <div className="task-row__actions">
        <EditFields
          todo={todo}
          editTodo={editTodo}
          projectId={projectId}
          onUpdate={onUpdate}
          projectManager={projectManager}
        />
        <button onClick={handleDelete} className="task-row__delete-btn">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default TaskRow;
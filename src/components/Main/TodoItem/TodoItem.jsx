import React, { useState } from 'react';
import { isPast, isToday, isTomorrow } from 'date-fns';
import TaskRow from '../TaskRow/TaskRow';
import EditFields from '../EditFields/EditFields';
import './TodoItem.scss';

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, projectId, onUpdate, projectManager }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545',
  };

  const getDueDateStatus = () => {
    if (!todo.dueDate || todo.completed) return 'normal';
    const due = new Date(todo.dueDate);
    if (isPast(due) && !isToday(due)) return 'overdue';
    if (isToday(due) || isTomorrow(due)) return 'urgent';
    return 'normal';
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <div
      style={{ borderLeft: `4px solid ${priorityColors[todo.priority]}`, opacity: todo.completed ? 0.6 : 1 }}
      className={`todo-item ${dueDateStatus}`}
    >
      {isExpanded ? (
        <EditFields
          todo={todo}
          editTodo={editTodo}
          projectId={projectId}
          onUpdate={onUpdate}
          projectManager={projectManager}
          setIsExpanded={setIsExpanded}
        />
      ) : (
        <TaskRow
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          projectId={projectId}
          onUpdate={onUpdate}
          setIsExpanded={setIsExpanded}
          projectManager={projectManager}
        />
      )}
    </div>
  );
}

export default TodoItem;
import React from 'react';
import './Checklist.scss';

function Checklist({ checklist, projectId, todoId, projectManager, onUpdate }) {
  const handleToggleChecklistItem = (checklistId) => {
    projectManager.toggleChecklistItem(projectId, todoId, checklistId);
    onUpdate();
  };

  return (
    <ul className="checklist">
      {checklist.map((item) => (
        <li key={item.id} className="checklist__item">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggleChecklistItem(item.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Checklist;
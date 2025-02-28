import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import './ProjectItem.scss';

function ProjectItem({ project, selectedProjectId, setSelectedProjectId, onDelete, onRename }) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newName, setNewName] = useState(project.name);

  const handleRename = () => {
    if (newName.trim()) {
      onRename(project.id, newName);
      setIsRenameOpen(false);
    }
  };

  const handleCancelRename = () => {
    setNewName(project.name);
    setIsRenameOpen(false);
  };

  return (
    <>
      <li
        className={`project-item ${selectedProjectId === project.id ? 'active' : ''}`}
        onClick={() => setSelectedProjectId(project.id)}
      >
        {project.name}
        <div className="project-item__actions">
          <button
            className="project-item__edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsRenameOpen(true);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="project-item__delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </li>
      {isRenameOpen && (
        <Modal
          title="Переименовать проект"
          onConfirm={handleRename}
          onCancel={handleCancelRename}
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Новое название"
            className="project-item__rename-input"
          />
        </Modal>
      )}
    </>
  );
}

export default ProjectItem;
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddProjectForm.scss';

function AddProjectForm({ projectManager, onUpdate, setSelectedProjectId, selectedProjectId }) {
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      projectManager.addProject(newProjectName);
      setNewProjectName('');
      onUpdate();
      if (!selectedProjectId) setSelectedProjectId(projectManager.getProjects()[0].id);
    }
  };

  return (
    <form onSubmit={handleAddProject} className="add-project-form">
      <input
        type="text"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
        placeholder="Новый проект"
        className="add-project-form__input"
      />
      <button type="submit" className="add-project-form__btn">
        <FaPlus />
      </button>
    </form>
  );
}

export default AddProjectForm;
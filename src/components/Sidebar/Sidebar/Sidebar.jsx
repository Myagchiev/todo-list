import React, { useState } from 'react';
import ProjectList from '../ProjectList/ProjectList';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import Modal from '../Modal/Modal';
import './Sidebar.scss';

function Sidebar({ projects, selectedProjectId, setSelectedProjectId, projectManager, onUpdate, onSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      projectManager.deleteProject(projectToDelete);
      onUpdate();
      if (selectedProjectId === projectToDelete) {
        const remainingProjects = projectManager.getProjects();
        setSelectedProjectId(remainingProjects[0]?.id || null);
      }
    }
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    onSearch('');
  };

  const handleRenameProject = (projectId, newName) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      project.name = newName;
      projectManager.saveToStorage();
      onUpdate();
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Проекты</h2>
      <ProjectList
        projects={projects}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={handleProjectSelect}
        onDelete={handleDeleteProject}
        onRename={handleRenameProject} // Добавили onRename
      />
      <AddProjectForm
        projectManager={projectManager}
        onUpdate={onUpdate}
        setSelectedProjectId={setSelectedProjectId}
        selectedProjectId={selectedProjectId}
      />
      {isModalOpen && (
        <Modal
          title="Удалить проект?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        >
          <p>Вы уверены, что хотите удалить проект?<br /> Все задачи внутри будут удалены.</p>
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
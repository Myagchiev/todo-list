import React from 'react';
import ProjectItem from '../ProjectItem/ProjectItem';
import './ProjectList.scss';

function ProjectList({ projects, selectedProjectId, setSelectedProjectId, onDelete, onRename }) {
  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
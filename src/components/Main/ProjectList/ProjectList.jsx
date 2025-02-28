import React, { useState } from 'react';
import Controls from '../Controls/Controls';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import './ProjectList.scss';

function ProjectList({ projects, projectManager, onUpdate, selectedProjectId }) {
  const [sortType, setSortType] = useState('none');
  const [filterType, setFilterType] = useState('all');
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const sortTodos = (todos) => {
    const sortedTodos = [...todos];
    switch (sortType) {
      case 'title':
        return sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
      case 'dueDate':
        return sortedTodos.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      case 'priority':
        return sortedTodos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      default:
        return sortedTodos;
    }
  };

  const filterTodos = (todos) => {
    switch (filterType) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'active':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const getFilteredAndSortedTodos = () => {
    const filtered = filterTodos(selectedProject.todos);
    return sortTodos(filtered);
  };

  return (
    <div className="project-list">
      <div className="project-list__header">
        <h3 className="project-list__title">{selectedProject.name}</h3>
        <Controls setSortType={setSortType} setFilterType={setFilterType} />
      </div>
      <TodoForm
        addTodo={(projectId, todoData) => {
          projectManager.addTodo(projectId, todoData);
          onUpdate();
        }}
        selectedProjectIndex={selectedProject.id}
      />
      <TodoList
        todos={getFilteredAndSortedTodos()}
        toggleTodo={(projectId, todoId) => {
          projectManager.toggleTodo(projectId, todoId);
          onUpdate();
        }}
        deleteTodo={projectManager.deleteTodo.bind(projectManager)}
        editTodo={projectManager.editTodo.bind(projectManager)} // Добавили editTodo
        projectId={selectedProject.id}
        onUpdate={onUpdate}
        projectManager={projectManager}
      />
    </div>
  );
}

export default ProjectList;
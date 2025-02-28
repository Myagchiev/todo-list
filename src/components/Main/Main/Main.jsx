import React from 'react';
import ProjectList from '../ProjectList/ProjectList';
import TodoList from '../TodoList/TodoList';
import './Main.scss';

function Main({ projects, projectManager, onUpdate, selectedProjectId, searchedTodos, searchQuery }) {
  return (
    <div className="main">
      {searchQuery && searchedTodos ? (
        <div className="main__search-results">
          <h3 className="main__search-title">Результаты поиска: {searchedTodos.length} задач</h3>
          <TodoList
            todos={searchedTodos}
            toggleTodo={(projectId, todoId) => {
              projectManager.toggleTodo(projectId, todoId);
              onUpdate();
            }}
            deleteTodo={projectManager.deleteTodo.bind(projectManager)}
            editTodo={projectManager.editTodo.bind(projectManager)}
            projectId={selectedProjectId}
            onUpdate={onUpdate}
            projectManager={projectManager}
          />
        </div>
      ) : (
        selectedProjectId && (
          <ProjectList
            projects={projects}
            projectManager={projectManager}
            onUpdate={onUpdate}
            selectedProjectId={selectedProjectId}
          />
        )
      )}
    </div>
  );
}

export default Main;
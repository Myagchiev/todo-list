import { useState } from 'react';
import ProjectManager from './logic/projectManager/projectManager';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar/Sidebar';
import Main from './components/Main/Main/Main';
import './App.scss';

function App() {
  const [projectManager] = useState(() => new ProjectManager());
  const [projects, setProjects] = useState(projectManager.getProjects());
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const updateProjects = () => {
    setProjects([...projectManager.getProjects()]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getSearchedTodos = () => {
    if (!searchQuery.trim()) return null;
    const allTodos = projects.flatMap((project) => project.todos);
    return allTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <div className="app__main">
        <Sidebar
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          projectManager={projectManager}
          onUpdate={updateProjects}
          onSearch={handleSearch} // Передаём onSearch в Sidebar
        />
        <Main
          projects={projects}
          projectManager={projectManager}
          onUpdate={updateProjects}
          selectedProjectId={selectedProjectId}
          searchedTodos={getSearchedTodos()}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

export default App;
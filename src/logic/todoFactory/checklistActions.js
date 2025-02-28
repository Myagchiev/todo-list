export function toggleChecklistItem(projects, projectId, todoId, checklistId) {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const todo = project.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.checklist = todo.checklist.map((item) =>
          item.id === checklistId ? { ...item, completed: !item.completed } : item
        );
      }
    }
  }
  
  export function addChecklistItem(projects, projectId, todoId, text) {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const todo = project.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.checklist.push({
          id: Date.now() + Math.random().toString(36).substr(2, 5),
          text,
          completed: false,
        });
      }
    }
  }
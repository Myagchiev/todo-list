import createTodo from '../todoFactory/todoFactory';

export function addProject(projects, name) {
  projects.push({
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    name,
    todos: [],
  });
}

export function deleteProject(projects, projectId) {
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) projects.splice(index, 1);
}

export function addTodo(projects, projectId, todoData) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const todo = createTodo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.notes,
      todoData.checklist
    );
    project.todos.push(todo);
  }
}

export function toggleTodo(projects, projectId, todoId) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) todo.completed = !todo.completed;
  }
}

export function editTodo(projects, projectId, todoId, updates) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const index = project.todos.findIndex((t) => t.id === todoId);
    if (index !== -1) project.todos[index] = { ...project.todos[index], ...updates };
  }
}

export function deleteTodo(projects, projectId, todoId) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    project.todos = project.todos.filter((t) => t.id !== todoId);
  }
}
import { addProject, deleteProject, addTodo, toggleTodo, editTodo, deleteTodo } from './projectActions';
import { addChecklistItem, toggleChecklistItem } from '../todoFactory/checklistActions';

const defaultProject = {
  id: Date.now() + Math.random().toString(36).substr(2, 5),
  name: 'Default',
  todos: [],
};

export default class ProjectManager {
  constructor() {
    this.projects = this.loadFromStorage() || [defaultProject];
  }

  loadFromStorage() {
    const data = localStorage.getItem('projects');
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed.map((project) => ({
      ...project,
      todos: project.todos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      })),
    }));
  }

  saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addProject(name) {
    addProject(this.projects, name);
    this.saveToStorage();
  }

  deleteProject(projectId) {
    deleteProject(this.projects, projectId);
    this.saveToStorage();
  }

  addTodo(projectId, todoData) {
    addTodo(this.projects, projectId, todoData);
    this.saveToStorage();
  }

  toggleTodo(projectId, todoId) {
    toggleTodo(this.projects, projectId, todoId);
    this.saveToStorage();
  }

  editTodo(projectId, todoId, updates) {
    editTodo(this.projects, projectId, todoId, updates);
    this.saveToStorage();
  }

  deleteTodo(projectId, todoId) {
    deleteTodo(this.projects, projectId, todoId);
    this.saveToStorage();
  }

  addChecklistItem(projectId, todoId, text) {
    addChecklistItem(this.projects, projectId, todoId, text);
    this.saveToStorage();
  }

  toggleChecklistItem(projectId, todoId, checklistId) {
    toggleChecklistItem(this.projects, projectId, todoId, checklistId);
    this.saveToStorage();
  }

  getProjects() {
    return this.projects;
  }
}
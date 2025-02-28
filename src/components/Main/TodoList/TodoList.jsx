import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.scss';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, projectId, onUpdate, projectManager }) {
  return (
    <ul className="todo-list">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="todo-list__item"
          >
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              projectId={projectId}
              onUpdate={onUpdate}
              projectManager={projectManager}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
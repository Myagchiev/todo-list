import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Modal from '../../Sidebar/Modal/Modal';
import './TodoForm.scss';

function TodoForm({ addTodo, selectedProjectIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(selectedProjectIndex, {
      title,
      description,
      dueDate,
      priority: priority || 'low',
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="todo-form__open-btn">
        Добавить задачу
      </button>
      {isOpen && (
        <Modal
          title="Добавить задачу"
          onConfirm={handleAdd}
          onCancel={handleCancel}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название задачи"
            className="todo-form__input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            className="todo-form__textarea"
          />
          <div className="todo-form__controls-row">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="todo-form__priority-select"
            >
              <option value="" disabled>Уровень важности</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
            <div className="todo-form__date-picker">
              <FaCalendarAlt className="todo-form__calendar-icon" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="todo-form__date-input"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TodoForm;
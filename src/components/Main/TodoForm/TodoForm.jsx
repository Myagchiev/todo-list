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
  const [errors, setErrors] = useState({ title: '', dueDate: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', dueDate: '' };

    if (!title.trim()) {
      newErrors.title = 'Название задачи не может быть пустым';
      isValid = false;
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dueDate = 'Дата не может быть в прошлом';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

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
    setErrors({ title: '', dueDate: '' });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setErrors({ title: '', dueDate: '' });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="todo-form__open-btn">
        Добавить задачу
      </button>
      {isOpen && (
        <Modal title="Добавить задачу" onConfirm={handleAdd} onCancel={handleCancel}>
          <div className="todo-form__field">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название задачи"
              className={`todo-form__input ${errors.title ? 'todo-form__input--error' : ''}`}
            />
            {errors.title && <span className="todo-form__error">{errors.title}</span>}
          </div>
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
              <option value="" disabled>
                Уровень важности
              </option>
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
                className={`todo-form__date-input ${errors.dueDate ? 'todo-form__input--error' : ''}`}
              />
              {errors.dueDate && <span className="todo-form__error">{errors.dueDate}</span>}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TodoForm;
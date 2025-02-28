import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { FaEdit, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import Modal from '../../Sidebar/Modal/Modal';
import Checklist from '../Checklist/Checklist';
import './EditFields.scss';

function EditFields({ todo, editTodo, projectId, onUpdate, projectManager }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({ ...todo });
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleEdit = () => {
    console.log('handleEdit called'); // Добавьте это
    if (editData.title.trim()) {
      editTodo(projectId, todo.id, {
        ...editData,
        dueDate: editData.dueDate ? new Date(editData.dueDate) : null,
      });
      onUpdate();
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...todo });
    setNewChecklistItem('');
    setIsOpen(false);
  };

  const handleAddChecklistItem = () => {
    console.log('handleAddChecklistItem called'); 
    if (newChecklistItem.trim()) {
      projectManager.addChecklistItem(projectId, todo.id, newChecklistItem);
      setNewChecklistItem('');
      onUpdate();
    }
  };

  const modalContent = (
    <Modal
      title="Редактировать задачу"
      onConfirm={handleEdit}
      onCancel={handleCancel}
    >
      <input
        type="text"
        value={editData.title}
        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        placeholder="Название задачи"
        className="edit-fields__input"
      />
      <textarea
        value={editData.description}
        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        placeholder="Описание"
        className="edit-fields__textarea"
      />
      <div className="edit-fields__controls-row">
        <select
          value={editData.priority}
          onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
          className="edit-fields__priority-select"
        >
          <option value="" disabled>Уровень важности</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <div className="edit-fields__date-picker">
          <FaCalendarAlt className="edit-fields__calendar-icon" />
          <input
            type="date"
            value={editData.dueDate ? format(editData.dueDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
            className="edit-fields__date-input"
          />
        </div>
      </div>
      <div className="edit-fields__checklist-form">
        <input
          type="text"
          value={newChecklistItem}
          onChange={(e) => setNewChecklistItem(e.target.value)}
          placeholder="Подзадача"
          className="edit-fields__checklist-input"
        />
        <button type="button" onClick={handleAddChecklistItem} className="edit-fields__checklist-btn">
          <FaPlus />
        </button>
      </div>
      <Checklist
        checklist={todo.checklist}
        projectId={projectId}
        todoId={todo.id}
        projectManager={projectManager}
        onUpdate={onUpdate}
      />
    </Modal>
  );

  return (
    <div className="edit-fields">
      <button onClick={() => setIsOpen(true)} className="edit-fields__edit-btn">
        <FaEdit />
      </button>
      {isOpen && createPortal(modalContent, document.body)}
    </div>
  );
}

export default EditFields;
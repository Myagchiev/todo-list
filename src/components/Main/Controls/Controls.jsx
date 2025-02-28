import React from 'react';
import './Controls.scss';

function Controls({ setSortType, setFilterType }) {
  return (
    <div className="controls">
      <div className="controls__sort">
        <label className="controls__sort-label">Сортировать:</label>
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="controls__sort-select"
        >
          <option value="none">Без сортировки</option>
          <option value="title">Название</option>
          <option value="dueDate">Дата</option>
          <option value="priority">Приоритет</option>
        </select>
      </div>
      <div className="controls__filter">
        <label className="controls__filter-label">Фильтр:</label>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="controls__filter-select"
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="active">Активные</option>
        </select>
      </div>
    </div>
  );
}

export default Controls;
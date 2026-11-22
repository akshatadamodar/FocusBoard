import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, onEdit, onDelete, onStatus, onReset, filtersActive }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <div className="empty-mark">✦</div>
        <h3>No tasks found</h3>
        <p>Try a different search or reset your filters to see more tasks.</p>
        {filtersActive && <button className="secondary-btn" onClick={onReset}>Reset filters</button>}
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-table-head" aria-hidden="true">
        <span>TASK NAME</span><span>CATEGORY</span><span>PRIORITY</span><span>STATUS</span><span>DUE DATE</span><span>ACTIONS</span>
      </div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} />
      ))}
    </div>
  );
}

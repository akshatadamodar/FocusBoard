import { CalendarDays, Pencil, Trash2 } from 'lucide-react';
import { formatDate, STATUSES } from '../utils/taskHelpers.js';

export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  const toggleComplete = () => onStatus(task.id, task.status === 'Completed' ? 'To do' : 'Completed');

  return (
    <article className="task-row">
      <div className="task-name">
        <button
          className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}
          aria-label={task.status === 'Completed' ? `Mark ${task.title} as to do` : `Mark ${task.title} as completed`}
          aria-pressed={task.status === 'Completed'}
          onClick={toggleComplete}
        >
          {task.status === 'Completed' ? '✓' : ''}
        </button>
        <div><strong>{task.title}</strong><small>{task.description || 'No description added'}</small></div>
      </div>
      <div className="task-category"><span>{task.category}</span></div>
      <div className="task-priority"><span className={`priority-badge ${task.priority.toLowerCase()}`}><i />{task.priority}</span></div>
      <div className="task-status">
        <select
          className={`status-select ${task.status.toLowerCase().replace(' ', '-')}`}
          aria-label={`Status for ${task.title}`}
          value={task.status}
          onChange={event => onStatus(task.id, event.target.value)}
        >
          {STATUSES.map(status => <option key={status}>{status}</option>)}
        </select>
      </div>
      <div className="due-date"><CalendarDays size={15} aria-hidden="true" />{formatDate(task.dueDate)}</div>
      <div className="task-actions">
        <button className="icon-btn" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil size={16} /></button>
        <button className="icon-btn delete-icon" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><Trash2 size={16} /></button>
      </div>
    </article>
  );
}

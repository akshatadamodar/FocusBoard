import { RotateCcw } from 'lucide-react';

const tabs = ['All', 'To do', 'In progress', 'Completed'];

export default function FilterTabs({ status, onStatusChange, priority, onPriorityChange, onReset, counts }) {
  const filtersActive = status !== 'All' || priority !== 'All';
  return (
    <div className="filter-row">
      <div className="tabs" role="group" aria-label="Filter by status">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${status === tab ? 'active-tab' : ''}`}
            aria-pressed={status === tab}
            onClick={() => onStatusChange(tab)}
          >
            {tab}{tab === 'All' && counts ? <span className="tab-count">{counts.total}</span> : null}
          </button>
        ))}
      </div>
      <div className="filter-tools">
        <label className="priority-select">
          <span>Priority</span>
          <select aria-label="Filter by priority" value={priority} onChange={event => onPriorityChange(event.target.value)}>
            <option value="All">All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        {filtersActive && (
          <button className="reset-btn" onClick={onReset} aria-label="Reset all filters">
            <RotateCcw size={15} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}

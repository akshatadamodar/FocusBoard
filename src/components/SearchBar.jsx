import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, inputRef }) {
  return (
    <div className="search-box">
      <Search size={18} aria-hidden="true" />
      <input
        ref={inputRef}
        aria-label="Search tasks by title"
        placeholder="Search tasks..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      {value && (
        <button type="button" className="search-clear" aria-label="Clear search" onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

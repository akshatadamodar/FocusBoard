export const STATUSES = ['To do', 'In progress', 'Completed'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Design', 'Development', 'Testing', 'Research'];

export function createTaskId(tasks) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const largestId = tasks.reduce((max, task) => {
    const numeric = Number(task.id);
    return Number.isFinite(numeric) ? Math.max(max, numeric) : max;
  }, 0);
  return largestId + 1;
}

export function calculateStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter(task => task.status === 'In progress').length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  return {
    total,
    inProgress,
    completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100)
  };
}

export function getVisibleTasks(tasks, { search, status, priority }) {
  const keyword = search.trim().toLowerCase();
  return tasks.filter(task => {
    const matchesSearch = keyword === '' || task.title.toLowerCase().includes(keyword);
    const matchesStatus = status === 'All' || task.status === status;
    const matchesPriority = priority === 'All' || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function formatDate(value) {
  if (!value) return 'No date';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 'No date';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function isValidTask(task) {
  return Boolean(
    task &&
    typeof task === 'object' &&
    (typeof task.id === 'string' || typeof task.id === 'number') &&
    typeof task.title === 'string' &&
    typeof task.status === 'string' &&
    typeof task.priority === 'string'
  );
}

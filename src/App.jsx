import { useMemo, useRef, useState } from 'react';
import { CheckCircle2, CircleDashed, ListTodo, TrendingUp } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import MobileNav from './components/MobileNav.jsx';
import Header from './components/Header.jsx';
import StatCard from './components/StatCard.jsx';
import FocusNotes from './components/FocusNotes.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterTabs from './components/FilterTabs.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import NoticeDialog from './components/NoticeDialog.jsx';
import { useLocalStorage, isValidTaskArray } from './hooks/useLocalStorage.js';
import { sampleTasks } from './data/sampleTasks.js';
import { calculateStats, createTaskId, getVisibleTasks } from './utils/taskHelpers.js';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks, isValidTaskArray);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('My tasks');
  const [notice, setNotice] = useState(null);
  const searchRef = useRef(null);

  const stats = useMemo(() => calculateStats(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => getVisibleTasks(tasks, { search, status, priority }),
    [tasks, search, status, priority]
  );
  const filtersActive = search !== '' || status !== 'All' || priority !== 'All';

  const resetFilters = () => {
    setSearch('');
    setStatus('All');
    setPriority('All');
  };

  const handleNavigate = label => {
    setActiveNav(label);
    setMenuOpen(false);
    if (label === 'Overview') {
      document.getElementById('overview-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (label === 'My tasks') {
      document.getElementById('tasks-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setNotice({
        title: `${label} is outside this assessment`,
        message: `The FocusBoard assessment covers the task dashboard only. The ${label} section is shown in the navigation to match the Figma design, but no separate screen is required.`
      });
    }
  };

  const handleProfile = () => {
    setMenuOpen(false);
    setNotice({
      title: 'Workspace User',
      message: 'This is a single-user frontend demo. Accounts, profiles and authentication are intentionally out of scope for the assessment.'
    });
  };

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = task => { setEditing(task); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditing(null); };

  const saveTask = data => {
    setTasks(current => editing
      ? current.map(task => task.id === editing.id ? { ...task, ...data, id: task.id } : task)
      : [{ ...data, id: createTaskId(current) }, ...current]);
    closeForm();
  };

  const updateStatus = (id, nextStatus) => {
    setTasks(current => current.map(task => task.id === id ? { ...task, status: nextStatus } : task));
  };

  const confirmDelete = () => {
    if (pendingDelete) setTasks(current => current.filter(task => task.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={activeNav} onNavigate={handleNavigate} onProfile={handleProfile} />
      <div className="main-panel">
        <Header onMenu={() => setMenuOpen(open => !open)} onAdd={openCreate} menuOpen={menuOpen} />

        <main className="dashboard">
          <div className="page-heading">
            <div>
              <h1>Your work, in focus.</h1>
              <p>Plan your day. Stay organized, and celebrate small wins.</p>
            </div>
          </div>

          <section className="greeting-card" aria-label="Daily greeting">
            <span className="greeting-label">GOOD AFTERNOON</span>
            <h2>Make today count</h2>
            <p>{stats.total} tasks waiting for your attention.</p>
          </section>

          <FocusNotes />

          <section className="overview-section" aria-labelledby="overview-title">
            <h2 id="overview-title">Overview</h2>
            <div className="stats-grid" aria-label="Task overview">
              <StatCard label="Total tasks" value={stats.total} note="Across all tasks" icon={ListTodo} tone="violet" />
              <StatCard label="In progress" value={stats.inProgress} note="Currently in progress" icon={CircleDashed} tone="blue" />
              <StatCard label="Completed" value={stats.completed} note={`${stats.percent}% completion rate`} icon={CheckCircle2} tone="green" />
              <StatCard label="Completion rate" value={`${stats.percent}%`} note="Based on completed tasks" icon={TrendingUp} tone="orange" />
            </div>
          </section>

          <section className="tasks-section" aria-labelledby="tasks-title">
            <div className="section-heading">
              <div>
                <h2 id="tasks-title">My tasks</h2>
                <p>Your priorities for this week</p>
              </div>
              <div className="section-actions">
                <button className="text-btn" onClick={resetFilters}>View all tasks</button>
                <button className="primary-btn" onClick={openCreate}>New task</button>
              </div>
            </div>
            <div className="task-toolbar">
              <SearchBar value={search} onChange={setSearch} inputRef={searchRef} />
              <FilterTabs
                status={status}
                onStatusChange={setStatus}
                priority={priority}
                onPriorityChange={setPriority}
                onReset={resetFilters}
                counts={stats}
              />
            </div>
            <TaskList
              tasks={visibleTasks}
              onEdit={openEdit}
              onDelete={setPendingDelete}
              onStatus={updateStatus}
              onReset={resetFilters}
              filtersActive={filtersActive}
            />
          </section>
        </main>
      </div>

      <MobileNav active={activeNav} onNavigate={handleNavigate} />
      <TaskForm open={formOpen} task={editing} onClose={closeForm} onSave={saveTask} />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this task?"
        message={pendingDelete ? `“${pendingDelete.title}” will be permanently removed from your dashboard.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
      <NoticeDialog notice={notice} onClose={() => setNotice(null)} />
    </div>
  );
}

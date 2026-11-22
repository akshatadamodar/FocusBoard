import { CalendarDays, CheckSquare, LayoutDashboard, Settings, X } from 'lucide-react';

export const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My tasks', icon: CheckSquare },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings }
];

export default function Sidebar({ open, onClose, active, onNavigate, onProfile }) {
  return <>
    {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="Sidebar navigation">
      <div className="brand">
        <span className="brand-mark"><CheckSquare size={20} strokeWidth={2.5} /></span>
        <span>FocusBoard</span>
        <button className="icon-btn mobile-close" onClick={onClose} aria-label="Close menu"><X size={20} /></button>
      </div>
      <div className="nav-caption">WORKSPACE</div>
      <nav aria-label="Main navigation">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`nav-item ${active === item.label ? 'active' : ''}`}
              aria-current={active === item.label ? 'page' : undefined}
              onClick={() => { onNavigate(item.label); onClose(); }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <button className="profile profile-button" onClick={onProfile} aria-label="View workspace profile">
          <div className="avatar">CA</div>
          <div><strong>Workspace User</strong><small>Personal workspace</small></div>
        </button>
      </div>
    </aside>
  </>;
}

import { Menu, Plus, X } from 'lucide-react';

export default function Header({ onMenu, onAdd, menuOpen }) {
  const MenuIcon = menuOpen ? X : Menu;
  return (
    <header className={`topbar ${menuOpen ? 'menu-is-open' : ''}`}>
      <button className="icon-btn menu-trigger" onClick={onMenu} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}><MenuIcon size={22} /></button>
      <div className="mobile-brand">FocusBoard</div>
      <div className="breadcrumbs">Workspace <span>/</span> <strong>My tasks</strong></div>
      <div className="top-actions">
        <button className="primary-btn top-add" onClick={onAdd}><Plus size={16} /> <span>New task</span></button>
      </div>
    </header>
  );
}

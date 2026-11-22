import { navItems } from './Sidebar.jsx';

export default function MobileNav({ active, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className={`mobile-nav-item ${active === item.label ? 'active' : ''}`}
            aria-current={active === item.label ? 'page' : undefined}
            onClick={() => onNavigate(item.label)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

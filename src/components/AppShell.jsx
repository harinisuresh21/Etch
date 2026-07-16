import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/inbox', label: 'Inbox' },
  { to: '/library', label: 'Library' },
  { to: '/lab', label: 'Assistant' },
]

export default function AppShell({ title, subtitle, actions, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/inbox" className="brand">
          <div className="brand-mark">E</div>
          <div>
            <div className="brand-name">Etch</div>
            <div className="brand-tag">Personal Wikipedia</div>
          </div>
        </Link>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          Save URLs, summarize them, and ask questions across your archive.
        </div>
      </aside>

      <div className="shell-main">
        <header className="page-header">
          <div>
            <p className="eyebrow">Etch Workspace</p>
            <h1>{title}</h1>
            {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div className="page-actions">{actions}</div> : null}
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
